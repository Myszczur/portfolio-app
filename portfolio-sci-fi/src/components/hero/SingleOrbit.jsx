import { Trail } from "@react-three/drei";
import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";

function SingleOrbit({
  radius = 5,
  speed = 10,
  color = "#FFA500",
  size = 0.2,
  rotation = [0, 0, 0],
  trailColor = color,
  trailWidth = 0.1,
  trailLength = 4,
}) {
  const groupRef = useRef();
  const electronRef = useRef();

  useLayoutEffect(() => {
    const anim = gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    return () => anim.kill();
  }, [speed]);

  return (
    <group rotation={rotation}>
      <group ref={groupRef}>
        <Trail width={trailWidth} color={trailColor} length={trailLength}>
          <mesh castShadow ref={electronRef} position={[radius, 0, 0]}>
            <icosahedronGeometry args={[size, 1]} />
            <meshStandardMaterial
              emissive={color}
              emissiveIntensity={2}
              color={color}
              toneMapped={false}
            />
          </mesh>
        </Trail>
      </group>
    </group>
  );
}

export default SingleOrbit;
