import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollManager = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const introSection = document.querySelector("#intro");
      const skillsSection = document.querySelector("#skills");
      const projectsSection = document.querySelector("#projects");

      // ========= ETAP 1: Horyzontalny scroll w sekcji #skills =========
      // Ta animacja działa tylko, gdy scrollujemy wertykalnie WEWNĄTRZ #skills.
      const scroller = document.querySelector("#skills-scroller");
      gsap.to(scroller, {
        x: () => -(scroller.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: skillsSection,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          pin: ".skills-sticky-container", // Przyklejamy kontener kart, a nie całą sekcję!
        },
      });

      // Animacja wejścia dla elementów w #skills
      const skillsTl = gsap.timeline({
        scrollTrigger: {
          trigger: skillsSection,
          start: "top 60%",
          end: "top 20%",
          scrub: true,
        },
      });
      skillsTl
        .from(["#skills .title", "#skills .subtitle"], { opacity: 0, y: 50 })
        .from("#skills .skill-card", { opacity: 0, y: 50, stagger: 0.2 }, "<");

      // ========= ETAP 2: Logika przeskakiwania między sekcjami =========

      function goToSection(section, i) {
        gsap.to(window, {
          scrollTo: { y: section, autoKill: false },
          duration: 1.2,
          ease: "power2.inOut",
        });
      }

      ScrollTrigger.create({
        trigger: introSection,
        start: "bottom bottom",
        // Kiedy zjeżdżamy z sekcji intro, płynnie scrollujemy na początek sekcji skills
        onEnter: () => goToSection(skillsSection),
      });

      ScrollTrigger.create({
        trigger: introSection,
        end: "bottom bottom",
        // Kiedy wracamy DO sekcji intro od dołu
        onEnterBack: () => goToSection(introSection),
      });

      ScrollTrigger.create({
        trigger: skillsSection,
        start: "bottom top",
        // Kiedy skończyliśmy scrollować całą sekcję skills (300vh), przechodzimy do projektów
        onEnter: () => goToSection(projectsSection),
      });

      ScrollTrigger.create({
        trigger: projectsSection,
        start: "top bottom",
        // Kiedy wracamy DO sekcji skills od dołu (z projektów)
        onEnterBack: () => goToSection(skillsSection),
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
};

export default ScrollManager;
