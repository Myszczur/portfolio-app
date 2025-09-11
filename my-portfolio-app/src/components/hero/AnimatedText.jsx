// import { motion } from "framer-motion";

// const AnimatedText = ({ text, className = "" }) => {
//   const words = text.split(" ");

//   const container = {
//     hidden: { opacity: 0 },
//     visible: (i = 1) => ({
//       opacity: 1,
//       transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
//     }),
//   };

//   const child = {
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 12,
//         stiffness: 100,
//       },
//     },
//     hidden: {
//       opacity: 0,
//       y: 20,
//       transition: {
//         type: "spring",
//         damping: 12,
//         stiffness: 100,
//       },
//     },
//   };

//   return (
//     <motion.div
//       style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
//       variants={container}
//       initial="hidden"
//       animate="visible"
//       className={className}
//     >
//       {words.map((word, index) => (
//         <motion.span
//           variants={child}
//           style={{ marginRight: "25px" }}
//           key={index}
//         >
//           {word}
//         </motion.span>
//       ))}
//     </motion.div>
//   );
// };

// export default AnimatedText;

import { motion } from "framer-motion";

const AnimatedText = ({ text, textAfter = "", children, className = "" }) => {
  const wordsBefore = text.split(" ");
  const wordsAfter = textAfter.split(" ").filter((word) => word.length > 0); // Dzielimy i usuwamy puste stringi

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }, // Lekko dostosowujemy timing
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
    // Używamy `motion.p`, bo to jest akapit - lepsze semantycznie niż div
    <motion.p
      style={{ display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {/* Animujemy pierwszą część tekstu */}
      {wordsBefore.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em" }} // Używamy 'em' dla lepszej skalowalności
          key={`before-${index}`}
        >
          {word}
        </motion.span>
      ))}

      {/* Renderujemy komponent-dziecko (np. RotatingText) bez animacji */}
      {children && <span style={{ marginRight: "0.25em" }}>{children}</span>}

      {/* Animujemy drugą część tekstu */}
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
