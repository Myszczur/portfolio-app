/* eslint-disable no-unused-vars */
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoCard from "./about/BentoCard";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    heading: "Architekt Kompletnych Doświadczeń",
    description: "W moim świecie, solidny backend w Javie to mózg operacji...",
    picture: "/brain.jpg",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    heading: "Kolekcjoner Nowych Technologii",
    description: "Nowa biblioteka JS? Ciekawy wzorzec projektowy w Springu?...",
    picture: "/technologia.jpg",
    className: "md:col-span-2",
  },
  {
    heading: "Cyfrowy Detektyw",
    description: "Uważam, że każdy bug to zagadka kryminalna...",
    picture: "/debug.jpg",
    className: "",
  },
  {
    heading: "Kod Po Godzinach",
    description: "Poza IDE, moje królestwo to kuchnia...",
    picture: "/recipe.jpg",
    className: "",
  },
];

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function AboutSection() {
  const sectionRef = useRef();
  const headingRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = headingRef.current.querySelectorAll("span");
      gsap.fromTo(
        letters,
        { y: 200, opacity: 0, rotate: 10 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          ease: "back.out(1.7)",
          stagger: 0.15,
          duration: 1.2,
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 md:px-8"
    >
      <div ref={headingRef} className="text-center mb-12 md:mb-20">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-extrabold uppercase">
          {"about".split("").map((ch, i) => (
            <span key={i} className="inline-block">
              {ch}
            </span>
          ))}
          <span className="text-green-400 mx-2"> </span>
          {"me".split("").map((ch, i) => (
            <span key={i} className="inline-block">
              {ch}
            </span>
          ))}
        </h1>
      </div>

      <motion.div
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 max-w-6xl mx-auto"
      >
        {cardsData.map((data, index) => (
          <BentoCard
            key={index}
            heading={data.heading}
            description={data.description}
            picture={data.picture}
            className={data.className}
          />
        ))}
      </motion.div>
    </section>
  );
}

export default AboutSection;
