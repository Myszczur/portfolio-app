import { Canvas } from "@react-three/fiber";
import ProfilePhoto from "./hero/ProfilePhoto";
import AnimatedText from "./hero/AnimatedText";
import GradientText from "./hero/GradientText";


function HeroSection() {

  return (
    <section
      id="start"
      className="flex md:pt-35 flex-col md:flex-row items-center w-screen h-dvh overflow-hidden"
    >
      <div className="flex-1 flex flex-col justify-center gap-4 md:gap-1 p-8 text-center md:text-left md:p-16 order-2 md:order-1">
        <AnimatedText
          text="Hi! I'm"
          textAfter="😊"
          className="sm:text-4xl md:text-3xl lg:text-5xl font-bold text-gray-200 leading-20 md:leading-12 tracking-wider"
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
          text="I bring apps to life – from the ground up to the fireworks. 🎆"
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-200 lg:leading-15 leading-8"
        />
        <AnimatedText
          text="Every day, I convert massive amounts of coffee into a reliable Java backend "
          textAfter="and complement it with a smooth, user-friendly React interface. 😍😁👌"
          className="text-2xl text-gray-300 leading-10 pt-5"
        />

        <div className="mt-4"></div>
      </div>

      <div className="flex-1 w-full h-1/2 md:h-full order-1 md:order-2">
        <Canvas camera={{ position: [0, 0, 5], fov: 80 }}>
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
