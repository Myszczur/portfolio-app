/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

function AboutMeDescription({ heading, description, picture }) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (event) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((event.clientX - left) / width);
    mouseY.set((event.clientY - top) / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const cardRotate = useTransform([mouseX, mouseY], ([latestX, latestY]) => {
    const rotateX = (latestY - 0.5) * -20;
    const rotateY = (latestX - 0.5) * 20;
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  const imageTransform = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]) => {
      const translateX = (latestX - 0.5) * 70;
      const translateY = (latestY - 0.5) * 50;
      return `translateX(${translateX}px) translateY(${translateY}px) translateZ(80px)`;
    }
  );

  const headingTransform = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]) => {
      const translateX = (latestX - 0.5) * 30;
      const translateY = (latestY - 0.5) * 15;
      return `translateX(${translateX}px) translateY(${translateY}px) translateZ(50px)`;
    }
  );

  const descriptionTransform = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]) => {
      const translateX = (latestX - 0.5) * 15;
      const translateY = (latestY - 0.5) * 10;
      return `translateX(${translateX}px) translateY(${translateY}px) translateZ(25px)`;
    }
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: cardRotate,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-2xl shadow-green-500/10 bg-gray-900 backdrop-blur-lg border-4 border-green-400/50"
    >
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 transform-style-3d">
        <motion.div
          style={{ transform: imageTransform }}
          className="flex-shrink-0"
        >
          <img
            src={picture}
            alt="Zdjęcie profilowe"
            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-green-300 shadow-lg shadow-green-500/20"
          />
        </motion.div>

        <div className="flex-1 text-center md:text-left">
          <motion.h2
            style={{ transform: headingTransform }}
            className="text-3xl lg:text-4xl font-bold mb-4 text-white"
          >
            {heading}
          </motion.h2>
          <motion.p
            style={{ transform: descriptionTransform }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default AboutMeDescription;
