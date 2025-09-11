import { Canvas } from "@react-three/fiber";
import ProfilePhoto from "./hero/ProfilePhoto";
import AnimatedText from "./hero/AnimatedText";
import GradientText from "./hero/GradientText";
import RotatingText from "./hero/RotatingText";

function HeroSection() {
  return (
    <section id="start" className="flex flex-col md:flex-row items-center w-screen h-dvh overflow-hidden">
      <div className="flex-1 flex flex-col justify-center gap-4 p-8 text-center md:text-left md:p-16 order-2 md:order-1">
        <h1 />
        <AnimatedText
          text="Cześć! Jestem"
          textAfter="😊"
          className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-200 leading-20 tracking-wider"
        >
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
          >
            KAMIL
          </GradientText>
        </AnimatedText>
        <AnimatedText
          text="Ożywiam aplikacje, od fundamentów aż po fajerwerki. 🎆"
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-200 lg:leading-15 leading-8"
        />
        <AnimatedText
          text="Na co dzień zamieniam hektolitry kawy w solidny backend oparty o "
          textAfter="Java, a potem ubieram to w interfejs React, z którego naprawdę przyjemnie się korzysta 😍😁👌"
          className="text-2xl text-gray-300 leading-10 pt-5"
        />

        <div className="mt-4"></div>
      </div>

      <div className="flex-1 w-full h-1/2 md:h-full order-1 md:order-2">
        <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
          <ProfilePhoto position={[0, 0, 0]} />
          <ambientLight intensity={1.2} />
          <directionalLight position={[4, 4, 5]} intensity={1.5} castShadow />
          <pointLight
            position={[-5, -5, -5]}
            intensity={0.5}
            color="lightblue"
          />
        </Canvas>
      </div>
    </section>
  );
}

export default HeroSection;
