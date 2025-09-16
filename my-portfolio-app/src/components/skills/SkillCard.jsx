/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import useTilt from "../../hooks/useTilt";
import ElectricBorder from "./ElectricBorder";

const SkillCard = ({ skill, variants }) => {
  const tiltOptions = {
    max: 20,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.1,
  };

  const tiltRef = useTilt(tiltOptions);

  return (
    <ElectricBorder
      color="#7df9ff"
      speed={1}
      chaos={0.5}
      thickness={2}
      style={{ borderRadius: 10 }}
    >
      <motion.div
        ref={tiltRef}
        variants={variants}
        className="group relative w-36 h-36 rounded-xl transition-transform duration-300 ease-out hover:scale-105"
        style={{
          transformStyle: "preserve-3d",
          transform: "perspective(1000px)",
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl bg-green-900/10
          border-2 border-green-400/30 transition-all duration-300 transition-backdrop-filter group-hover:backdrop-blur-sm group-hover:border-green-300/80 group-hover:shadow-2xl group-hover:shadow-green-500/20"
        ></div>

        {/* ===== KONTENER IKONY ===== */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:-translate-y-3"
          style={{ transform: "translateZ(50px)" }}
        >
          {skill.icon &&
            React.cloneElement(skill.icon, {
              className:
                "transition-transform duration-300 group-hover:scale-125",
            })}
        </div>

        {/* ===== KONTENER TEKSTU ===== */}
        <div
          className="absolute inset-0 flex items-center justify-center
          transition-all duration-300 ease-in-out opacity-0 translate-y-4
          group-hover:opacity-100 group-hover:translate-y-12"
          style={{ transform: "translateZ(30px)" }}
        >
          <span className="font-medium text-md text-green-200 transition-colors duration-300 group-hover:text-white">
            {skill.name}
          </span>
        </div>
      </motion.div>
    </ElectricBorder>
  );
};

export default SkillCard;
