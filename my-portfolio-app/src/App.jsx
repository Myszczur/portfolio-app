import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import MatrixRain from "./components/MatrixRain";
import Navbar from "./components/Navbar";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";
import IntroOverlay from "./components/IntroOverlay";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const mainContentRef = useRef(null);

  useEffect(() => {
    if (!showIntro && mainContentRef.current) {
      gsap.to(mainContentRef.current, {
        opacity: 1,
        duration: 2,
        delay: 0.2,
      });
    }
  }, [showIntro]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="relative min-h-screen w-screen bg-black">
      {showIntro && <IntroOverlay onCompleted={handleIntroComplete} />}

      <main ref={mainContentRef} className="relative z-10 opacity-0">
        <div className="fixed inset-0 z-[-1]">
          <MatrixRain className="crisp-canvas" trailOpacity={0.04} speed={50} />
        </div>
        <Navbar />
        <HeroSection />
        <SkillsSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
