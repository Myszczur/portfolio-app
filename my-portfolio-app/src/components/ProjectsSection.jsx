import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectsShowcase from "./projects/ProjectsShowcase";
import { LuArrowRightToLine } from "react-icons/lu";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    image: "https://picsum.photos/300/300?grayscale",
    title: "my-Pordasdcasfcsdfdsadas",
    description: "Opis 1...",
  },
  {
    image: "https://picsum.photos/400/400?grayscale",
    title: "Item 2dasdasdasdasdasd",
    description: "Opis 2...",
  },
  {
    image: "https://picsum.photos/500/500?grayscale",
    title: "Item 3dasdasdasdasda",
    description: "Opis 3...",
  },
  {
    image: "https://picsum.photos/600/600?grayscale",
    title: "Item 4daqfdcasdfvasd",
    description: "Opis 4...",
  },
  {
    image: "https://picsum.photos/600/600?grayscale",
    title: "Item test1dasdasdasdas",
    description: "Opis 5...",
  },
  {
    image: "https://picsum.photos/600/600?grayscale",
    title: "Item test2dasdasd",
    description: "Opis 6...",
  },
];

const ProjectsSection = () => {
  const mainRef = useRef(null);
  const contentRef = useRef(null);
  const introRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        x: () => `-${1 * window.innerWidth}px`,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: () => `+=${1 * window.innerWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        introRef.current,
        { scale: 1.5, filter: "blur(20px)", opacity: 0 },
        {
          scale: 1.2,
          filter: "blur(0px)",
          opacity: 1,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top center",
          },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={mainRef}
      id="projects"
      className="relative w-full overflow-hidden text-white pb-20"
    >
      <div ref={contentRef} className="flex w-[150vw] h-screen relative">
        {/* Panel 1: Intro */}
        <div
          ref={introRef}
          className="w-screen h-full flex-shrink-0 flex flex-col items-center justify-center text-center p-8"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold">Moje Projekty</h2>
          <p className="text-2xl text-gray-400 mt-8 font-bold animate-bounce ">
            Przewijaj dalej...
          </p>
        </div>

        {/* Panel 2: Projekty */}
        <div className="w-screen h-full flex-shrink-0">
          <ProjectsShowcase items={items} />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
