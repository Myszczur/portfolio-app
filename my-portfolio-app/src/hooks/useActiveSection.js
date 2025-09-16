import { useEffect, useState } from "react";

export function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] || "");

  useEffect(() => {
    const handleScroll = () => {
      let current = sectionIds[0];
      for (let id of sectionIds) {
        const elem = document.getElementById(id);
        if (!elem) continue;
        const top = elem.getBoundingClientRect().top;
        if (top <= window.innerHeight / 2) {
          current = id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return active;
}
