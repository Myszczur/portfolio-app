import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    title: "Design & UX",
    text: "Tworzenie intuicyjnych i estetycznych interfejsów, które angażują użytkownika od pierwszego kliknięcia.",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
    initialPosition: { x: "-100vw", rotate: -15 },
  },
  {
    title: "Frontend Development",
    text: "Implementacja dynamicznych i responsywnych stron z wykorzystaniem najnowszych technologii, takich jak React i Astro.",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    initialPosition: { x: "100vw", rotate: 15 },
  },
  {
    title: "Backend & API",
    text: "Budowanie solidnych fundamentów aplikacji, wydajnych API i logiki biznesowej w technologiach takich jak Java i Spring.",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2070&auto=format&fit=crop",
    initialPosition: { y: "100vh", rotate: 0 },
  },
];

export default function StickyCards() {
  // Nie potrzebujemy już refa do komponentu, bo triggerem będzie sekcja z Astro
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    // ScrollTrigger musi odświeżyć się, aby poprawnie wykryć niestandardowy scroller
    ScrollTrigger.refresh();

    let ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          // WAŻNE: Wskazujemy, który element jest naszym "oknem" przewijania
          scroller: "#scroll-container",
          // WAŻNE: Włączamy tryb horyzontalny
          horizontal: true,

          // Triggerem jest teraz cała sekcja, w której znajduje się komponent
          trigger: "#skills-section",

          // Start: gdy lewa krawędź triggera dotknie lewej krawędzi scroller'a
          start: "left left",

          // Koniec: trwaj przez 3000px horyzontalnego scrolla
          end: "+=3000",

          // Przypinamy sekcję '#skills-section' na czas animacji
          pin: true,
          scrub: 1,
          // markers: true, // Bardzo przydatne do debugowania horyzontalnego scrolla
        },
      });

      cardsRef.current.forEach((card, index) => {
        gsap.set(card, {
          x: cardData[index].initialPosition.x || 0,
          y: cardData[index].initialPosition.y || 0,
          rotation: cardData[index].initialPosition.rotate || 0,
        });

        timeline.to(
          card,
          {
            x: 0,
            y: 0,
            rotation: 0,
            top: `${index * 40}px`,
            ease: "power1.inOut",
          },
          index * 0.2
        );
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    // Ten div będzie teraz po prostu kontenerem na karty,
    // ponieważ cała sekcja w Astro jest już wycentrowana.
    <div className="relative w-full h-full flex items-center justify-center">
      {cardData.map((card, index) => (
        <div
          key={card.title}
          ref={(el) => (cardsRef.current[index] = el)}
          className="absolute flex w-10/12 md:w-8/12 lg:w-7/12 aspect-[16/9] bg-white rounded-2xl shadow-2xl p-6 md:p-10 overflow-hidden"
          style={{ zIndex: index + 1 }}
        >
          <div className="w-1/2 h-full pr-4">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-1/2 pl-4 flex flex-col justify-center">
            <h3 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
              {card.title}
            </h3>
            <p className="text-gray-600">{card.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
