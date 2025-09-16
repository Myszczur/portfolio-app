/* eslint-disable no-unused-vars */
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const BentoCard = ({ className, heading, description, picture }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      variants={cardVariants}
      className={`${className} relative rounded-2xl overflow-hidden group bg-gray-900 border border-white/10`}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px at ${x.get() * 100 + 50}% ${
            y.get() * 100 + 50
          }%, rgba(0, 255, 150, 0.15), transparent 80%)`,
        }}
      />

      <motion.img
        src={picture}
        alt={heading}
        style={{
          transform: "translateZ(8px) scale(1.05)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

      <motion.div
        style={{
          transform: "translateZ(5000px)",
          transformStyle: "preserve-3d",
        }}
        className="relative h-full flex flex-col justify-end p-6 text-white"
      >
        <h3 className="text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-green-300">
          {heading}
        </h3>
        <p className="text-sm md:text-base text-white/80">{description}</p>
      </motion.div>
    </motion.div>
  );
};

export default BentoCard;
