export const skillsData = [
  { id: "react", name: "React", group: "frontend" },
  { id: "astro", name: "Astro", group: "frontend" },
  { id: "tailwind", name: "Tailwind", group: "frontend" },
  { id: "gsap", name: "GSAP", group: "animation" },
  { id: "ts", name: "TypeScript", group: "language" },
  { id: "node", name: "Node.js", group: "backend" },
  { id: "figma", name: "Figma", group: "design" },
  { id: "three", name: "Three.js", group: "animation" },
];

export const skillsConnections = [
  { from: "react", to: "ts" },
  { from: "react", to: "tailwind" },
  { from: "react", to: "gsap" },
  { from: "astro", to: "react" },
  { from: "astro", to: "tailwind" },
  { from: "node", to: "ts" },
  { from: "gsap", to: "three" },
];

// Możesz zdefiniować kolory dla grup, żeby je wizualnie odróżnić
export const groupColors = {
  frontend: "#61DAFB", // React Blue
  animation: "#85d23b", // GSAP Green
  language: "#3178C6", // TypeScript Blue
  backend: "#68A063", // Node Green
  design: "#F24E1E", // Figma Red
};
