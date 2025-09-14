import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PhotoBox from "./contact//PhotoBox";
import Model3DBox from "./contact/Model3DBox";
import ContactFormBox from "./contact/ContactFormBox";
import Modal from "./contact/Modal";
import Magnet from "./footer/Magnet";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".photo-box", {
        scale: 0.8,
        rotateY: -20,
        opacity: 0,
        duration: 2.2,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      gsap.from(".text3d-box", {
        x: 100,
        opacity: 0,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      gsap.from(".contact-button", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-button", start: "top 90%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="min-h-screen sm:pb-20 flex flex-col items-center justify-center p-4 gap-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          <PhotoBox className="photo-box" />
          <Model3DBox className="text3d-box lg:col-span-2" />
        </div>

        <Magnet padding={200} disabled={false} magnetStrength={3}>
          <button
            onClick={() => setIsModalOpen(true)}
            className="contact-button font-mono py-4 px-8 border-2 border-green-500 text-green-400 font-bold rounded-lg
                    text-xl hover:bg-green-500 hover:text-gray-900 hover:shadow-lg hover:shadow-green-500/40
                    transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Establish a connection
          </button>
        </Magnet>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ContactFormBox />
      </Modal>
    </>
  );
};

export default ContactSection;
