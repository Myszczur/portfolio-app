import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Glitch,
  Scanline,
  Vignette,
} from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

export default function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.8}
        kernelSize={3}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.15}
      />

      <DepthOfField focusDistance={0.05} focalLength={0.025} bokehScale={5} />

      <Vignette offset={0.5} darkness={0.8} eskil={false} />

      <Glitch
        delay={[5, 8]}
        duration={[0.6, 1.0]}
        strength={[0.3, 1.0]}
        mode={GlitchMode.SPORADIC}
        active={Math.random() > 0.95}
      />

      <Scanline density={5.5} opacity={0.1} brightness={0.5} />
    </EffectComposer>
  );
}
