import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

// Rejestrujemy wtyczkę Observer
gsap.registerPlugin(Observer);

// Nie potrzebujemy już 'window.addEventListener('load')', bo Astro domyślnie 
// ładuje skrypty z opóźnieniem (defer), więc DOM będzie gotowy.

const container = document.querySelector("#scroll-container");
const sections = gsap.utils.toArray("section");

// Mała poprawka - upewniamy się, że skrypt nie wywali błędu, jeśli nie znajdzie kontenera
// (np. na innej podstronie bez tej struktury)
if (!container || sections.length === 0) {
  // Jeśli nie ma kontenera lub sekcji, po prostu nie wykonuj reszty kodu
  console.log("Horizontal scroll container not found. Script not running.");
} else {
  let isScrolling = false;
  let currentSectionIndex = 0;

  gsap.set(container, { x: 0 });

  function goToSection(index) {
    if (isScrolling) return;

    currentSectionIndex = index;
    isScrolling = true;

    gsap.to(container, {
      x: -sections[index].offsetLeft,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        isScrolling = false;
      }
    });
  }

  Observer.create({
    target: window,
    type: "wheel,touch,pointer",
    wheelSpeed: -1, 
    tolerance: 15,
    preventDefault: true,

    onUp: () => {
      if (currentSectionIndex < sections.length - 1) {
        goToSection(currentSectionIndex + 1);
      }
    },
    onDown: () => {
      if (currentSectionIndex > 0) {
        goToSection(currentSectionIndex - 1);
      }
    }
  });

  // Dodajmy też obsługę klawiatury dla dostępności!
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentSectionIndex < sections.length - 1) {
      goToSection(currentSectionIndex + 1);
    } else if (e.key === 'ArrowLeft' && currentSectionIndex > 0) {
      goToSection(currentSectionIndex - 1);
    }
  });
}