import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  PivotControls,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { generateMobiusPath } from "../components/mobiusSpiral";
import Labyrinth from "./Labyrinth";
import PostProcessing from "./PostProcessing";

export default function Scene() {
  const cameraRef = useRef();
  const scroll = useScroll();
  const pathPoints = useMemo(() => generateMobiusPath(), []);

  useFrame(() => {
    if (!cameraRef.current || !pathPoints.length) return;

    const t = scroll.offset * 2;
    const pointIndex = Math.floor(t * (pathPoints.length - 1));

    if (pointIndex >= 0 && pointIndex < pathPoints.length) {
      const point = pathPoints[pointIndex];
      cameraRef.current.position.copy(point);

      // Dynamiczny obrót w zakrętach
      const sharpTurn = Math.sin(t * Math.PI * 2) * 0.3;
      cameraRef.current.rotation.z = sharpTurn;

      // Nagłe obroty o 180° co 25% scrolla
      const flipProgress = (scroll.offset * 4) % 1;
      if (flipProgress < 0.1) {
        cameraRef.current.rotation.x = flipProgress * Math.PI * 2;
      }
    }
  });

  return (
    <>
      <perspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={75}
        near={0.1}
        far={50}
      />

      <Labyrinth pathPoints={pathPoints} />

      <Environment preset="sunset" background>
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -9]}
        />
      </Environment>

      <PostProcessing />
    </>
  );
}
