import React, { useRef, useLayoutEffect, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  Text3D,
  Environment,
  Stars,
  Sparkles,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import AtomOrbits from "./hero/AtomOrbits";
import ProfilePhoto from "./hero/ProfilePhoto";

// ===============================================
// Ten komponent odpowiada za interakcję z myszką
// ===============================================
function Rig({ children }) {
  const ref = React.useRef();
  // Wracamy do wbudowanego hooka R3F
  const { mouse } = useThree();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        (mouse.x * Math.PI) / 20,
        0.05
      );
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        (mouse.y * Math.PI) / 20,
        0.05
      );
    }
  });

  return <group ref={ref}>{children}</group>;
}

// ===============================================
// Twoja scena z drobnymi modyfikacjami
// ===============================================
function Scene({ targetRef, margin = 0.5 }) {
  const { width, height } = useThree((state) => state.viewport);

  const groupRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 1.5 + Math.sin(time * 1.5) * 0.75;
    }
  });

  useLayoutEffect(() => {
    const floatingAnim = gsap.to(groupRef.current.position, {
      y: -0.25,
      duration: 4.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      floatingAnim.kill();
    };
  }, []);

  return (
    <>
      <group ref={groupRef}>
        <Center
          top
          left
          position={[width / 4 - margin, -height / 2.6 + margin, 0]}
        >
          <Text3D
            castShadow
            letterSpacing={-0.06}
            size={0.55}
            font="/fonts/Orbitron.json"
          >
            {`Full Stack Developer\n JAVA  &  REACT `}
            <meshStandardMaterial
              emissive="#00bfff"
              emissiveIntensity={1.2}
              toneMapped={false}
              color="#add8e6"
            />
          </Text3D>
        </Center>

        <Center>
          <Text3D
            castShadow
            curveSegments={32}
            bevelEnabled
            bevelSize={0.04}
            bevelThickness={0.1}
            height={0.5}
            lineHeight={0.8}
            letterSpacing={-0.06}
            size={1.5}
            font="/fonts/Orbitron.json"
          >
            {`Kamil\nUrbanik`}
            <meshStandardMaterial
              ref={materialRef}
              emissive="#FFA500"
              toneMapped={false}
              color="#FFA500"
              metalness={0.8}
              roughness={0.15}
            />
          </Text3D>
        </Center>
      </group>
    </>
  );
}

function CameraIntroAnimation() {
  const { camera } = useThree();
  useEffect(() => {
    // Ustawiamy pozycję początkową kamery (lekko z boku i z oddali)
    camera.position.set(-5, 3, 20);
    // Animujemy kamerę do jej docelowej pozycji
    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: 15, // Końcowa pozycja kamery (taka sama jak w Canvas)
      duration: 2.5,
      ease: "power3.inOut",
    });
    // Możemy też animować, gdzie kamera patrzy
    gsap.to(camera.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power3.inOut",
    });
  }, [camera]);
  return null; // Komponent nie renderuje niczego widocznego
}

// ===============================================
// Główny komponent ze wszystkimi zmianami
// ===============================================
function HeroSection() {
  const sunRef = useRef();

  return (
    <Canvas camera={{ position: [0, 0, 14], fov: 60 }} shadows>
      <fog attach="fog" args={["#050515", 15, 30]} />
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#FFA500" intensity={2} />
      <fog attach="fog" args={["#050515", 15, 30]} />

      <Stars
        radius={100}
        depth={50}
        count={8000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <Rig>
        <Scene />
        <ProfilePhoto position={[5, 2, -2]} />
      </Rig>
      <AtomOrbits />

      <Environment preset="city" />

      <EffectComposer>
        <Bloom
          intensity={1.0}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.5}
          height={400}
        />
        <ChromaticAberration offset={[0.001, 0.001]} />
        <Vignette />
      </EffectComposer>
      <Sparkles count={500} scale={20} size={4} speed={0.4} color="#00bfff" />
      <CameraIntroAnimation />
    </Canvas>
  );
}

export default HeroSection;
