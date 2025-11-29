import React, { useEffect, useRef, useState } from "react";

const items = [
  { id: 1, color: "#f87171", label: "Item 1" },
  { id: 2, color: "#34d399", label: "Item 2" },
  { id: 3, color: "#60a5fa", label: "Item 3" },
  { id: 4, color: "#facc15", label: "Item 4" },
  { id: 5, color: "#a78bfa", label: "Item 5" },
];

const Carousel = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);
  const speed = 1; // pixels per frame

  // Duplicate items for seamless effect
  const carouselItems = [...items, ...items];

  // Measure container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setWidth(containerRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Smooth continuous forward movement
  useEffect(() => {
    let animationFrame;

    const animate = () => {
      setX((prevX) => {
        let newX = prevX + speed;
        const totalWidth = width * items.length;
        if (newX >= totalWidth) newX = 0; // seamless loop
        return newX;
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [width]);

  // Dot tracking
  const activeIndex = Math.floor(x / width) % items.length;

  // Jump to dot
  const handleDotClick = (dotIndex) => {
    setX(dotIndex * width);
  };

  return (
    <div className="h-full w-full" ref={containerRef} style={{ overflow: "hidden" }}>
      <div
        className="md:h-[96%] h-[94%] flex"
        ref={contentRef}
        style={{
          transform: `translateX(-${x}px)`,
          width: `${carouselItems.length * 100}%`,
        }}
      >
        {carouselItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              minWidth: `${100 / carouselItems.length}%`,
              flexShrink: 0,
              backgroundColor: item.color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontSize: "2rem",
            }}
            className="h-full"
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          gap: "8px",
        }}
      >
        {items.map((_, idx) => (
          <div
            key={idx}
            onClick={() => handleDotClick(idx)}
            style={{
              borderRadius: "50%",
              background: idx === activeIndex ? "#000" : "#ccc",
              cursor: "pointer",
            }}

            className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px]"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
