import { Circle, Ring, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

// Komponent Rig nie jest już potrzebny, jego logikę przenosimy niżej.

function ProfilePhoto({ position = [0, 0, 0] }) {
  // 1. Pobieramy `mouse` z useThree bezpośrednio tutaj
  const { mouse } = useThree();
  const texture = useTexture("/brain.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  // 2. Ten ref będzie teraz obsługiwał i pozycję, i rotację
  const groupRef = useRef();
  const frameRef = useRef();
  const hoverTimeline = useRef();

  const baseRadius = 1.7;
  const frameThickness = 0.06;

  // 3. Przeniesiona logika z komponentu Rig
  // Obraca całą grupą (groupRef) w odpowiedzi na ruch myszki
  useFrame(() => {
    if (groupRef.current) {
      // Zmieniamy `ref.current` na `groupRef.current`
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (mouse.x * Math.PI) / 20,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (mouse.y * Math.PI) / 20,
        0.05
      );
    }
  });

  useLayoutEffect(() => {
    // Animacje GSAP pozostają bez zmian, bo operują na tym samym `groupRef`
    const ctx = gsap.context(() => {
      gsap.to(groupRef.current.position, {
        y: groupRef.current.position.y + 0.1,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      hoverTimeline.current = gsap
        .timeline({ paused: true })
        .to(groupRef.current.scale, {
          x: 1.1,
          y: 1.1,
          z: 1.1,
          duration: 0.5,
          ease: "power3.out",
        })
        .to(
          frameRef.current.material.color,
          { r: 0.5, g: 0.8, b: 1, duration: 0.5, ease: "power3.out" },
          "<"
        );
    }, groupRef);

    return () => ctx.revert();
  }, []);

  return (
    // Ta grupa ma teraz przypisaną pozycję, animacje GSAP oraz rotację z useFrame
    <group
      position={position}
      ref={groupRef}
      onPointerOver={() => hoverTimeline.current?.play()}
      onPointerOut={() => hoverTimeline.current?.reverse()}
    >
      {/* 4. Usuwamy opakowanie <Rig>, bo jego logika jest już w komponencie */}
      <Circle args={[baseRadius, 64]}>
        <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
      </Circle>
      <Ring ref={frameRef} args={[baseRadius, baseRadius + frameThickness, 64]}>
        <meshBasicMaterial color="#2E7D32" toneMapped={false} />
      </Ring>
      <Circle args={[baseRadius + frameThickness, 64]} position-z={0.01}>
        <meshPhysicalMaterial roughness={0} transmission={1} thickness={0.1} />
      </Circle>
    </group>
  );
}

export default ProfilePhoto;
