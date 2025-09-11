import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const logoAscii = `
██╗  ██╗██╗   ██╗
██║ ██╔╝██║   ██║
█████╔╝ ██║   ██║
██╔═██╗ ██║   ██║
██║  ██╗╚██████╔╝
╚═╝  ╚═╝ ╚═════╝
`;

const IntroOverlay = ({ onCompleted }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onCompleted) onCompleted();
      },
    });

    const logoLines = overlayRef.current.querySelectorAll(".logo-line");

    tl.to(".blinking-cursor", { opacity: 1, duration: 0.5 })
      .to("#line1", { duration: 0.7, text: "Booting kernel...", ease: "none" })
      .to("#line2", { duration: 1.0, text: "Loading user modules... [OK]", ease: "none" }, "+=0.3")
      .to("#line3", { duration: 1.3, text: "Establishing secure connection...", ease: "none" }, "+=0.3")
      .to("#line4-prefix", { duration: 1, text: "Authenticating user... ", ease: "none" }, "+=0.3")
      .to("#line4-status", {
        duration: 0.7,
        text: { value: "ACCESS GRANTED", className: "text-success font-bold" },
        ease: "none"
      })
      .to(".intro-text", { duration: 0.3, opacity: 0, stagger: 0.1 }, "+=0.7")
      .set(".intro-text", { text: "" })
      .set("#logo-container", { opacity: 1, y: 0 })
      .fromTo(logoLines,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" }
      )
      .to("#logo-container", {
        scale: 1.05,
        duration: 0.2,
        repeat: 1,
        yoyo: true,
        ease: "power2.inOut",
      }, "+=0.5")
      .to(overlayRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.in",
        delay: 0.8,
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        }
      });
  }, [onCompleted]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black font-matrix text-lg md:text-2xl text-green-400"
    >
      <div className="text-left w-11/12 max-w-2xl">
        <div className="intro-text-container">
          <p className="intro-text" id="line1"></p>
          <p className="intro-text" id="line2"></p>
          <p className="intro-text" id="line3"></p>
          <p className="intro-text" id="line4">
            <span id="line4-prefix"></span>
            <span id="line4-status"></span>
          </p>
        </div>
        <div id="logo-container" className="opacity-0 text-center">
          <pre className="ascii-logo">
            {logoAscii.split('\n').map((line, index) => (
              <span key={index} className="logo-line block">{line}</span>
            ))}
          </pre>
        </div>
        <span className="blinking-cursor opacity-0">_</span>
      </div>
    </div>
  );
};

export default IntroOverlay;