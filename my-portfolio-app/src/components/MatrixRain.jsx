import { useRef, useEffect } from "react";

const MatrixRain = ({
  mainColor = "#2E7D32",
  headColor = "#2E7D32",
  trailOpacity = 0.05,
  speed = 70,
  fontSize = 16,
  className = "",
}) => {
  const canvasRef = useRef(null);

  const codeChars = "abcdefghijklmnopqrstuvwxyz0123456789:=><![]{}()&|?#@$*;/^";
  const getRandomChar = () =>
    codeChars[Math.floor(Math.random() * codeChars.length)];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let columns;
    let rainDrops;
    let animationFrameId;

    const initialize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      columns = Math.floor(rect.width / fontSize);
      rainDrops = Array.from({ length: columns }).map(() =>
        Math.floor((Math.random() * rect.height) / fontSize)
      );
    };

    const draw = () => {
      const rect = canvas.parentElement.getBoundingClientRect();

      ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`;
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = mainColor;

      for (let i = 0; i < rainDrops.length; i++) {
        const char = getRandomChar();
        const y = rainDrops[i] * fontSize;

        ctx.fillText(char, i * fontSize, y);

        ctx.shadowColor = headColor;
        ctx.shadowBlur = 10;
        ctx.fillStyle = headColor;
        ctx.fillText(char, i * fontSize, y);

        ctx.shadowBlur = 0;
        ctx.fillStyle = mainColor;

        rainDrops[i]++;

        if (rainDrops[i] * fontSize > rect.height && Math.random() > 0.97) {
          rainDrops[i] = 0;
        }
      }
    };

    let lastTime = 0;
    const animate = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      if (deltaTime > speed) {
        draw();
        lastTime = timestamp;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    initialize();
    animate(0);

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      initialize();
      lastTime = 0;
      animate(0);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mainColor, headColor, trailOpacity, speed, fontSize]);

  return (
    <div className={`absolute inset-0 z-[-1] bg-black ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default MatrixRain;
