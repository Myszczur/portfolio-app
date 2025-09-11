/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutMeDescription from "./about/AboutMeDescription";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    heading: "Architekt Kompletnych Doświadczeń",
    description: "W moim świecie, solidny backend w Javie to mózg operacji...",
    picture: "/brain.jpg",
  },
  {
    heading: "Kolekcjoner Nowych Technologii",
    description: "Nowa biblioteka JS? Ciekawy wzorzec projektowy w Springu?...",
    picture: "/technologia.jpg",
  },
  {
    heading: "Cyfrowy Detektyw",
    description:
      "Uważam, że każdy bug to zagadka kryminalna, a ja jestem detektywem...",
    picture: "/debug.jpg",
  },
  {
    heading: "Kod Po Godzinach",
    description: "Poza IDE, moje królestwo to kuchnia...",
    picture: "/recipe.jpg",
  },
];

function AboutSection() {
  const targetref = useRef();
  const headingRef = useRef();

  const { scrollY } = useScroll({
    target: targetref,
    offset: ["start start", "end end"],
  });

  const vh = window.innerHeight;
  const aboutCardTimeline = cardsData.map((_, index) => {
    const start = 3000 + index * vh;
    const end = 3000 + (index + 1) * vh;
    return [start, end];
  });

  const timeline = [[2500, 3000], ...aboutCardTimeline];

  const animation = timeline.map((data) => ({
    scale: useTransform(scrollY, data, [1, 0.8]),
    opacity: useTransform(scrollY, data, [1, 0]),
  }));

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
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
    }, targetref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about">
      <div ref={targetref} className="relative">
        {/* Animowany napis */}
        <div
          ref={headingRef}
          className="h-[500px] sticky top-0 flex items-center justify-center text-center
                    text-4xl sm:text-5xl md:text-7xl lg:text-[130px]
                    uppercase leading-tight md:leading-[90px] lg:leading-[110px]
                    px-4 sm:px-8 md:px-16 lg:px-36 overflow-clip z-0"
        >
          <h1 className="w-full text-white font-extrabold drop-shadow-lg">
            {/* rozbicie liter na span dla animacji */}
            {"about".split("").map((ch, i) => (
              <span key={i} className="inline-block">
                {ch}
              </span>
            ))}
            <br />
            {"me".split("").map((ch, i) => (
              <span key={i} className="inline-block ml-2">
                {ch}
              </span>
            ))}
          </h1>
        </div>

        {/* Cards */}
        {cardsData.map((data, index) => (
          <motion.div
            key={index}
            style={{
              scale: animation[index + 1].scale,
              opacity: animation[index + 1].opacity,
            }}
            className="py-10 md:py-20 sticky top-0 flex items-center justify-center min-h-screen z-10"
          >
            <AboutMeDescription
              heading={data.heading}
              description={data.description}
              picture={data.picture}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default AboutSection;
