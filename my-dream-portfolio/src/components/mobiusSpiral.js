import * as THREE from "three";

const SPIRAL_PARAMS = {
  radius: 4,
  twistFrequency: 0.5,
  verticalStretch: 2,
  noiseScale: 0.8,
};

export const generateMobiusPath = (segments = 200) => {
  const points = [];
  const { radius, twistFrequency, verticalStretch, noiseScale } = SPIRAL_PARAMS;

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 4;
    const noiseOffset = noiseScale * Math.sin(t * 0.7) * 0.5;

    const r = radius + Math.cos(t * twistFrequency) + noiseOffset;
    points.push(
      new THREE.Vector3(
        r * Math.cos(t),
        r * Math.sin(t),
        Math.sin(t * twistFrequency) * verticalStretch
      )
    );
  }

  return points;
};

const noise = (x) => Math.sin(x * 12.9898) * 0.5 + 0.5;
