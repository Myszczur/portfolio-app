import { useMemo, useRef } from "react";
import { Html, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function Labyrinth({ pathPoints }) {
  const wallsRef = useRef();
  const projects = useMemo(
    () => [
      { id: 1, title: "UI Design", position: 0.25 },
      { id: 2, title: "3D Art", position: 0.5 },
      { id: 3, title: "WebGL Experiments", position: 0.75 },
    ],
    []
  );

  const wallInstances = useMemo(() => {
    if (!pathPoints || pathPoints.length === 0) return [];

    const instances = [];
    const WALL_SPACING = 5;

    for (let i = 0; i < pathPoints.length; i += WALL_SPACING) {
      const point = pathPoints[i];
      const nextPoint = pathPoints[i + WALL_SPACING] || pathPoints[0];

      const direction = new THREE.Vector3()
        .subVectors(nextPoint, point)
        .normalize();
      const perpendicular = new THREE.Vector3(
        -direction.z,
        0,
        direction.x
      ).normalize();

      instances.push({
        position: point.clone().add(perpendicular.multiplyScalar(1.5)),
        rotation: Math.atan2(direction.x, direction.z),
      });

      instances.push({
        position: point.clone().sub(perpendicular.multiplyScalar(1.5)),
        rotation: Math.atan2(direction.x, direction.z),
      });
    }

    return instances;
  }, [pathPoints]);

  return (
    <>
      <instancedMesh
        ref={wallsRef}
        args={[null, null, wallInstances.length]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.2, 3, 3]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} metalness={0.2} />
      </instancedMesh>

      {projects.map((project) => {
        if (!pathPoints || pathPoints.length === 0) return null;

        const pointIndex = Math.floor(project.position * pathPoints.length);
        const position = pathPoints[pointIndex];

        return (
          <group key={project.id} position={position}>
            <Html distanceFactor={5}>
              <div className="bg-purple-900/30 backdrop-blur-sm border border-purple-500/50 rounded-xl p-4 max-w-xs text-center">
                <h3 className="text-xl font-bold text-purple-300">
                  {project.title}
                </h3>
                <p className="text-purple-200/70">
                  Click to enter this dream...
                </p>
              </div>
            </Html>

            <MeshReflectorMaterial
              resolution={512}
              args={[2, 2]}
              mirror={0.75}
              mixBlur={10}
              mixStrength={1.5}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.0}
            >
              {() => (
                <Material
                  color="#8a2be2"
                  roughness={0.2}
                  metalness={0.8}
                  clearcoat={1}
                />
              )}
            </MeshReflectorMaterial>
          </group>
        );
      })}
    </>
  );
}
