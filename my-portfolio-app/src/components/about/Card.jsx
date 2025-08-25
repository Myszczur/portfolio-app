import React from "react";
import AboutMeDescription from "./AboutMeDescription";

const Card = ({ data, index }) => {
  // Przykładowe dane, które możesz później rozbudować
  const headings = [
    "Projektowanie UX/UI",
    "Development Aplikacji",
    "Optymalizacja & DevOps",
  ];
  const descriptions = [
    "Tworzę intuicyjne i estetyczne interfejsy...",
    "Buduję skalowalne aplikacje webowe od A do Z...",
    "Zapewniam wydajność i niezawodność...",
  ];
  const pictures = [
    "/path/to/img1.jpg",
    "/path/to/img2.jpg",
    "/path/to/img3.jpg",
  ];

  return (
    <div className="flex items-center justify-center h-full">
      <AboutMeDescription
        heading={headings[index]}
        description={descriptions[index]}
        picture={pictures[index]}
      />
    </div>
  );
};

export default Card;
