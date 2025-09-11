/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Magnet from "./footer/Magnet";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative z-10 bg-black/80 border-t-2 border-green-500/40 backdrop-blur-md"
    >
      <div className="container mx-auto max-w-5xl px-6 py-10">
        {/* CTA */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-green-400 drop-shadow-[0_0_10px_#00ff00] mb-2">
            Are you currently looking for a developer to join your team?
          </h2>
          <p className="text-green-300 mb-4">
            React • Java – Full Stack in Practice. 🚀
            <br />
            Contact me, I'd be happy to take on new challenges!
          </p>
          <Magnet padding={200} disabled={false} magnetStrength={3}>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:twoj@mail.com"
              className="inline-block px-6 py-2 rounded-lg bg-green-600/80 hover:bg-green-500 text-black font-bold shadow-lg shadow-green-500/30 transition"
            >
              Contact me
            </motion.a>
          </Magnet>
        </div>

        {/* Ikony social */}
        <div className="flex justify-center space-x-6 mb-12">
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://github.com/Myszczur"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-green-400 hover:text-green-300 hover:drop-shadow-[0_0_6px_#00ff00] transition"
          >
            <FaGithub size={28} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://www.linkedin.com/in/kamil-urbanik"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-green-400 hover:text-green-300 hover:drop-shadow-[0_0_6px_#00ff00] transition"
          >
            <FaLinkedin size={28} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="mailto:kamil.urbanik@wir.pl"
            aria-label="Email"
            className="text-green-400 hover:text-green-300 hover:drop-shadow-[0_0_6px_#00ff00] transition"
          >
            <FaEnvelope size={28} />
          </motion.a>
        </div>

        {/* Linia */}
        <div className="w-full h-px bg-green-800 mb-8"></div>

        {/* Copyright */}
        <div className="text-center text-sm">
          <p className="text-green-300 drop-shadow-[0_0_6px_#00ff00]">
            © {currentYear} <span className="font-semibold">Kamil Urbanik</span>
            . Made with passion{" "}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="inline-block text-green-400 drop-shadow-[0_0_6px_#00ff00]"
            >
              ❤️
            </motion.span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
