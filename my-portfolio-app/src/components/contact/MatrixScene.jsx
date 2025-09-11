import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Scanline } from "@react-three/postprocessing";
import { SentinelModel } from "./SentinelModel";

const MatrixScene = () => {
  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 70 }}>
      <ambientLight intensity={1} />
      <pointLight position={[1, 2, 0]} intensity={6} color="#00ff41" />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1.0}
        color="#00ff88"
      />

      <SentinelModel
        scale={0.5}
        position={[0, -0.8, 0]}
        rotation={[0.1, 0, 0]}
      />

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />

      <EffectComposer>
        <Bloom
          intensity={0.2}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.1}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default MatrixScene;
