import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import MatrixRain from "./components/MatrixRain";
import Navbar from "./components/Navbar";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative min-h-screen w-screen bg-black">
      <main className="relative z-10">
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
