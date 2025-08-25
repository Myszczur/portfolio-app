/* eslint-disable no-unused-vars */
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const navLinks = ["Start", "Skills", "About", "Projects", "Contact"];

const Navbar = () => {
  const [active, setActive] = useState("start");
  const [isTop, setIsTop] = useState(true);

  const controls = useAnimation();

  const handleScroll = (e, target) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: target, offsetY: 70 },
      ease: "power4.Out",
    });
  };

  useEffect(() => {
    controls.set({ width: "100%", borderRadius: "0px" });

    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsTop(!scrolled);

      if (scrolled) {
        controls.start({
          width: "60%",
          borderRadius: "20px",
          transition: { duration: 0.5, ease: "easeOut" },
        });
      } else {
        controls.start({
          width: "100%",
          borderRadius: "0px",
          transition: { duration: 0.5, ease: "easeOut" },
        });
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  useEffect(() => {
    controls.set({ width: "100%", borderRadius: "0px" });

    const handleScroll = () => {
      if (window.scrollY > 50) {
        controls.start({
          width: "60%",
          borderRadius: "20px",
          transition: { duration: 0.5, ease: "easeOut" },
        });
      } else {
        controls.start({
          width: "100%",
          borderRadius: "0px",
          transition: { duration: 0.5, ease: "easeOut" },
        });
      }
    };

    // odpalenie na start (na wypadek gdy user odświeży nie na samej górze)
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full flex justify-center z-50 pointer-events-none"
    >
      <motion.div
        animate={controls}
        className="pointer-events-auto bg-black/80 border-b-2 border-green-500/40 backdrop-blur-lg px-6 py-4 flex justify-between items-center"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
          <motion.span
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [0, -2, 2, 0],
              opacity: isTop ? 1 : 0,
            }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 0.4,
                repeatType: "mirror",
                ease: "linear",
              },
              opacity: { duration: 0.2 },
            }}
            className="text-green-400 font-extrabold tracking-wider drop-shadow-[0_0_10px_#00ff00]"
          >
            {"<Full Stack Developer Java & React />"}
          </motion.span>

          <motion.span
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [0, 2, -2, 0],
              opacity: isTop ? 1 : 0,
            }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 0.4,
                repeatType: "mirror",
                ease: "linear",
              },
              opacity: { duration: 0.2 },
            }}
            className="absolute left-0 top-0 text-green-200 font-extrabold tracking-wider drop-shadow-[0_0_10px_#22ff00]"
          >
            {"<Full Stack Developer Java & React />"}
          </motion.span>
        </div>
        {/* LOGO */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-green-400 font-extrabold text-2xl tracking-widest drop-shadow-[0_0_10px_#00ff00]"
        >
          {"<Kamil Urbanik />"}
        </motion.h1>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => {
            const id = link.toLowerCase();
            const isActive = active === id;

            return (
              <motion.a
                key={link}
                href={`#${id}`}
                onClick={(e) => {
                  setActive(id);
                  handleScroll(e, `#${id}`);
                }}
                whileHover={{
                  scale: 1.1,
                  color: "#22c55e",
                  textShadow: "0px 0px 12px #00ff00",
                }}
                transition={{ duration: 0.2 }}
                className={`relative font-medium transition
                  ${
                    isActive
                      ? "text-green-400 drop-shadow-[0_0_10px_#00ff00]"
                      : "text-green-300"
                  }`}
              >
                {link}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 bottom-[-6px] h-[2px] bg-green-500 w-full"
                  />
                )}
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
