import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const ContactFormBox = ({ className }) => {
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    const formElements = formRef.current.elements;
    const fields = Array.from(formElements).filter(
      (el) => el.tagName !== "BUTTON"
    );
    const button = formRef.current.querySelector("button");

    const tl = gsap.timeline({ delay: 1.2 });

    tl.to(titleRef.current, {
      duration: 1.2,
      text: ">> Oczekuję na transmisję...",
      ease: "none",
    });

    tl.fromTo(
      fields,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.2, ease: "power2.out" },
      "-=0.5"
    );

    tl.fromTo(
      button,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
    );

    return () => tl.kill();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const fields = formRef.current.querySelectorAll("input, textarea, button");

    fields.forEach((el) => (el.disabled = true));

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    tl.to(e.target.querySelector("button"), {
      scale: 0.9,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });

    tl.to([titleRef.current, ...fields], {
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
    });

    tl.to(formRef.current, {
      backgroundColor: "rgba(0,255,100,0.1)",
      boxShadow: "0 0 20px rgba(0,255,100,0.6)",
      duration: 0.5,
    });

    tl.to(formRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        formRef.current.style.display = "none";

        gsap.fromTo(
          successRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            onStart: () => {
              gsap.to(successRef.current, {
                text: ">> Transmisja zakończona pomyślnie ✅",
                duration: 2,
                ease: "none",
              });
            },
          }
        );
      },
    });
  };

  return (
    <div
      className={`${className} relative p-8 bg-black/50 border border-green-500/30 rounded-lg
      backdrop-blur-sm shadow-lg shadow-green-500/10`}
    >
      <h3 ref={titleRef} className="text-2xl text-green-300 mb-6 h-8"></h3>

      <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-green-300/80"
          >
            Identyfikator (Imię)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full bg-transparent border-b-2 border-green-500/30
              focus:border-green-400 focus:outline-none text-green-200 py-2 transition-all duration-300"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-green-300/80"
          >
            Adres zwrotny (Email)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full bg-transparent border-b-2 border-green-500/30
              focus:border-green-400 focus:outline-none text-green-200 py-2 transition-all duration-300"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-green-300/80"
          >
            Treść wiadomości
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            className="mt-1 block w-full bg-transparent border-b-2 border-green-500/30
              focus:border-green-400 focus:outline-none text-green-200 py-2 transition-all duration-300 resize-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 border border-green-500 text-green-400 font-bold rounded-md
                  hover:bg-green-500 hover:text-gray-900 hover:shadow-lg hover:shadow-green-500/40
                    transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Wyślij sygnał
        </button>
      </form>

      <div
        ref={successRef}
        className="absolute inset-0 flex items-center justify-center text-green-300 text-xl opacity-0 pointer-events-none"
      ></div>
    </div>
  );
};

export default ContactFormBox;
