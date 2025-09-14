/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const AnimatedText = ({ text, textAfter = "", children, className = "" }) => {
  const wordsBefore = text.split(" ");
  const wordsAfter = textAfter.split(" ").filter((word) => word.length > 0);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.p
      style={{ display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {wordsBefore.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em" }}
          key={`before-${index}`}
        >
          {word}
        </motion.span>
      ))}

      {children && <span style={{ marginRight: "0.25em" }}>{children}</span>}

      {wordsAfter.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em" }}
          key={`after-${index}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default AnimatedText;
