import React, { useEffect, useMemo, useRef, useState, useId } from "react";

const CurvedLoop = ({
  text = "• SCROLL • DRAG • EXPLORE",
  size = 5000, // Średnica w pikselach
  speed = 0.5,
  className = "",
  interactive = true,
}) => {
  const fullText = useMemo(() => `${text} ${text} ${text}`, [text]); // Powtarzamy tekst, aby wypełnić koło

  const textPathRef = useRef(null);
  const uid = useId();
  const pathId = `circle-path-${uid}`;

  // Definicja ścieżki - idealne koło
  const radius = size / 2 - 10; // Promień z małym marginesem
  const pathD = `M ${size / 2}, 10 A ${radius},${radius} 0 1,1 ${
    size / 2 - 0.1
  },10`;

  const dragRef = useRef({
    isDragging: false,
    lastX: 0,
    velocity: 0,
    currentOffset: 0,
  });

  useEffect(() => {
    let frameId;
    const step = () => {
      if (!dragRef.current.isDragging && textPathRef.current) {
        dragRef.current.currentOffset -= speed;
        textPathRef.current.setAttribute(
          "startOffset",
          `${dragRef.current.currentOffset}%`
        );
      }
      frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [speed]);

  const onPointerDown = (e) => {
    if (!interactive) return;
    dragRef.current.isDragging = true;
    dragRef.current.lastX = e.clientX;
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!interactive || !dragRef.current.isDragging || !textPathRef.current)
      return;
    const dx = e.clientX - dragRef.current.lastX;
    dragRef.current.lastX = e.clientX;
    dragRef.current.velocity = dx;
    dragRef.current.currentOffset += dx * 0.5; // Mnożnik czułości
    textPathRef.current.setAttribute(
      "startOffset",
      `${dragRef.current.currentOffset}px`
    );
  };

  const onPointerUp = () => {
    if (!interactive) return;
    dragRef.current.isDragging = false;
  };

  const cursorStyle = interactive
    ? dragRef.current.isDragging
      ? "grabbing"
      : "grab"
    : "auto";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size, cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp} // Ważne, by zakończyć przeciąganie po opuszczeniu
    >
      <svg
        className="w-full h-full overflow-visible animate-spin-slow" // Dodajemy subtelną animację obrotu
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>
        <text
          className={`
            fill-current text-gray-500 
            font-mono uppercase tracking-wider text-[10px]
            transition-colors duration-300
            group-hover:text-white
            ${className}
          `}
        >
          <textPath ref={textPathRef} href={`#${pathId}`}>
            {fullText}
          </textPath>
        </text>
      </svg>
      {/* Opcjonalnie: ikona w środku koła */}
      <div className="absolute text-green-400 text-3xl">&#10031;</div>
    </div>
  );
};

export default CurvedLoop;
