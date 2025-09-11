import { Circle, Ring, useTexture } from "@react-three/drei";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

function ProfilePhoto({ position = [0, 0, 0] }) {
  const texture = useTexture("/astronomy.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  const groupRef = useRef();
  const frameRef = useRef();
  const hoverTimeline = useRef();

  const baseRadius = 3.5;
  const frameThickness = 0.1;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Ciągła, subtelna animacja pływania
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
          {
            r: 0.5,
            g: 0.8,
            b: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          "<"
        );
    }, groupRef);

    return () => ctx.revert();
  }, []);
  return (
    <group
      position={position}
      ref={groupRef}
      onPointerOver={() => hoverTimeline.current?.play()}
      onPointerOut={() => hoverTimeline.current?.reverse()}
    >
      <Circle args={[baseRadius, 64]}>
        <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
      </Circle>
      <Ring ref={frameRef} args={[baseRadius, baseRadius + frameThickness, 64]}>
        <meshBasicMaterial
          color="#00bfff"
          toneMapped={false}
        />
      </Ring>
      <Circle args={[baseRadius + frameThickness, 64]} position-z={0.01}>
        <meshPhysicalMaterial roughness={0} transmission={1} thickness={0.1} />
      </Circle>
    </group>
  );
}

export default ProfilePhoto;
