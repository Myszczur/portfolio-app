import { useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";

function ParticleTunnel() {
  const count = 5000;
  // useMemo, aby nie przeliczać tego w każdej klatce
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Rozmieszczamy punkty losowo w długim cylindrze
      const theta = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = Math.sin(theta) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100; // Długość tunelu
    }
    return pos;
  }, [count]);

  // Tutaj możesz animować ruch w useFrame

  return (
    <Points positions={positions}>
      <PointMaterial
        transparent
        color="#00ffff" // Cyjanowy neon
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export default ParticleTunnel;
