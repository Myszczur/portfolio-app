import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Howl } from "howler";

// Rejestracja pluginów GSAP
gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef();

  useEffect(() => {
    // Konfiguracja płynnego scrolla
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1.5,
        invalidateOnRefresh: true,
        markers: false,
      },
    });

    // Efekt "głębokiego snu" przy przewijaniu
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        document.body.style.backgroundColor = `hsl(${
          self.progress * 360
        }, 20%, 5%)`;
      },
    });

    // Dźwięk snu
    const dreamSound = new Howl({
      src: ["/dreamscape.mp3"],
      volume: 0.3,
      loop: true,
      onload: () => dreamSound.play(),
      onend: () => dreamSound.play(),
    });

    // Wibracje przy "skokach snu"
    const vibrationInterval = setInterval(() => {
      if ("vibrate" in navigator && Math.random() > 0.9) {
        navigator.vibrate([50, 30, 50]);
      }
    }, 1000);

    return () => {
      dreamSound.unload();
      clearInterval(vibrationInterval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="h-[3000px] w-full bg-black">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>

      <div
        className="fixed inset-0 pointer-events-none mix-blend-overlay bg-gradient-to-b from-purple-900/10 to-blue-900/10"
        style={{
          filter: "blur(2px)",
          WebkitFilter: "blur(2px)",
        }}
      />
    </div>
  );
}

export default App;
