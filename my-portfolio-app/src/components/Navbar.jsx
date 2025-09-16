/* eslint-disable no-unused-vars */
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useActiveSection } from "../hooks/useActiveSection";

gsap.registerPlugin(ScrollToPlugin);

const navLinks = ["Start", "Skills", "About", "Projects", "Contact"];

const Navbar = () => {
  const [isTop, setIsTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const active = useActiveSection(navLinks.map((link) => link.toLowerCase()));
  const controls = useAnimation();

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsMenuOpen(false);
  };

  // useEffect(() => {
  //     controls.set({ width: "100%", borderRadius: "0px", maxWidth: "100%" });

  //     const handleScroll = () => {
  //       const scrolled = window.scrollY > 50;
  //       setIsTop(!scrolled);

  //       if (scrolled) {
  //         controls.start({
  //           width: "90%", // Lepsza wartość dla wszystkich ekranów
  //           maxWidth: "900px", // Ograniczenie na bardzo szerokich ekranach
  //           borderRadius: "20px",
  //           transition: { duration: 0.5, ease: "easeOut" },
  //         });
  //       } else {
  //         controls.start({
  //           width: "100%",
  //           maxWidth: "100%",
  //           borderRadius: "0px",
  //           transition: { duration: 0.5, ease: "easeOut" },
  //         });
  //       }
  //     };

  //     handleScroll();
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [controls]);

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

  const menuVariants = {
    open: {
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 25 },
    },
    closed: {
      y: "-100%",
      transition: { delay: 0.2, type: "spring", stiffness: 120, damping: 25 },
    },
  };

  return (
    <>
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
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
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

          {/* LOGO (bez zmian) */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-green-400 font-extrabold md:text-bold sm:text-sm lg:text-2xl md:text-xl p-1 tracking-widest drop-shadow-[0_0_10px_#00ff00]"
          >
            {"<Kamil Urbanik />"}
          </motion.h1>

          {/* NAWIGACJA DESKTOPOWA (bez zmian) */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const id = link.toLowerCase();
              const isActive = active === id;
              return (
                <motion.a
                  key={link}
                  href={`#${id}`}
                  onClick={(e) => handleScroll(e, id)}
                  whileHover={{
                    scale: 1.1,
                    color: "#22c55e",
                    textShadow: "0px 0px 12px #00ff00",
                  }}
                  className={`relative font-medium transition ${
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

          {/* NOWA IKONA HAMBURGERA - WIDOCZNA TYLKO NA MOBILCE */}
          <div className="md:hidden z-50">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative h-8 w-8 text-green-300"
              animate={isMenuOpen ? "open" : "closed"}
            >
              <motion.span
                style={{ left: "50%", top: "35%", x: "-50%", y: "-50%" }}
                className="absolute h-0.5 w-6 bg-current"
                variants={{
                  open: { rotate: "45deg", top: "50%" },
                  closed: { rotate: "0deg", top: "35%" },
                }}
              />
              <motion.span
                style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
                className="absolute h-0.5 w-6 bg-current"
                variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
              />
              <motion.span
                style={{ left: "50%", top: "65%", x: "-50%", y: "-50%" }}
                className="absolute h-0.5 w-6 bg-current"
                variants={{
                  open: { rotate: "-45deg", top: "50%" },
                  closed: { rotate: "0deg", top: "65%" },
                }}
              />
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* NOWY PANEL MENU MOBILNEGO */}
      <motion.div
        variants={menuVariants}
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center space-y-10"
      >
        {navLinks.map((link) => {
          const id = link.toLowerCase();
          return (
            <motion.a
              key={`mobile-${link}`}
              href={`#${id}`}
              onClick={(e) => handleScroll(e, id)}
              className="text-green-300 text-3xl font-bold"
              whileHover={{ scale: 1.1, color: "#22c55e" }}
            >
              {link}
            </motion.a>
          );
        })}
      </motion.div>
    </>
  );
};
export default Navbar;
