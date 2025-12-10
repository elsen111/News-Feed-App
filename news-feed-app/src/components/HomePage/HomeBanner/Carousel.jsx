import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";

const dragThreshold = 8;

// Static Data
const newsList = [
  {
    article_id: "aaab",
    link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydaniu-nowosci-wydawnicze-niaiu.read",
    title:
      "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
    pubDate: "2025-12-04",
    category: "politics",
    image_url: "../../../../public/images/dummy_pics/pic1.jpg",
    source_name: "Khazar News",
  },
  {
    article_id: "a2ab",
    link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydawnicze-niaiu.read",
    title:
      "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
    pubDate: "2025-01-04",
    category: "politics",
    image_url: "../../../../public/images/dummy_pics/pic2.jpg",
    source_name: "Khazar News",
  },
  {
    article_id: "a3ab",
    link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydawnicze-niaiu.read",
    title:
      "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
    pubDate: "2025-12-04",
    category: "politics",
    image_url: "../../../../public/images/dummy_pics/pic3.jpg",
    source_name: "Khazar News",
  },
  {
    article_id: "a4ab",
    link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydawnicze-niaiu.read",
    title:
      "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
    pubDate: "2025-12-04",
    category: "politics",
    image_url: "../../../../public/images/dummy_pics/pic4.jpg",
    source_name: "Khazar News",
  },
  {
    article_id: "aaa1",
    link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydawnicze-niaiu.read",
    title:
      "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
    pubDate: "2025-12-04",
    category: "politics",
    image_url: "../../../../public/images/dummy_pics/pic7.jpg",
    source_name: "Khazar News",
  },
];

const normalizeOffset = (value, totalWidth) =>
  totalWidth ? ((value % totalWidth) + totalWidth) % totalWidth : 0;

const HomeBannerCarousel = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const [slideWidth, setSlideWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);

  const startXRef = useRef(0);
  const baseOffsetRef = useRef(0);
  const pointerActiveRef = useRef(false);
  const pointerCapturedRef = useRef(false);
  const pointerIdRef = useRef(null);
  const hasDraggedRef = useRef(false);
  const allowClickRef = useRef(true);

  const duplicatedNews = [...newsList, ...newsList];
  const speed = 0.8;
  const totalSlides = newsList.length;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setSlideWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (!slideWidth || isDragging || isTextHovered) return;
    let rafId;
    const totalWidth = slideWidth * totalSlides;

    const loop = () => {
      setOffset((prev) => normalizeOffset(prev + speed, totalWidth));
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [slideWidth, isDragging, isTextHovered, totalSlides]);

  const handleDotClick = (idx) => {
    if (!slideWidth) return;
    setOffset(idx * slideWidth);
  };

  const handlePointerDown = (event) => {
    if (!slideWidth || !trackRef.current) return;
    pointerActiveRef.current = true;
    pointerIdRef.current = event.pointerId;
    allowClickRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = event.clientX;
    baseOffsetRef.current = offset;
  };

  const handlePointerMove = (event) => {
    if (!pointerActiveRef.current || !slideWidth) return;

    if (!hasDraggedRef.current) {
      const delta = event.clientX - startXRef.current;
      if (Math.abs(delta) <= dragThreshold) return;

      hasDraggedRef.current = true;
      allowClickRef.current = false;
      setIsDragging(true);
      baseOffsetRef.current = offset;
      startXRef.current = event.clientX;

      if (trackRef.current?.setPointerCapture) {
        trackRef.current.setPointerCapture(pointerIdRef.current);
        pointerCapturedRef.current = true;
      }
    }

    const movement = event.clientX - startXRef.current;
    const totalWidth = slideWidth * totalSlides;
    setOffset(normalizeOffset(baseOffsetRef.current - movement, totalWidth));
  };

  const finishPointerInteraction = (shouldSnap = true) => {
    if (!pointerActiveRef.current) return;

    const dragged = hasDraggedRef.current;

    if (pointerCapturedRef.current && trackRef.current?.releasePointerCapture) {
      trackRef.current.releasePointerCapture(pointerIdRef.current);
    }

    if (dragged && slideWidth && shouldSnap) {
      const totalWidth = slideWidth * totalSlides;
      const rawIndex = Math.round(offset / slideWidth);
      const normalizedIndex =
        ((rawIndex % totalSlides) + totalSlides) % totalSlides;
      setOffset(normalizeOffset(normalizedIndex * slideWidth, totalWidth));
    }

    if (dragged) {
      requestAnimationFrame(() => {
        allowClickRef.current = true;
      });
    } else {
      allowClickRef.current = true;
    }

    pointerActiveRef.current = false;
    pointerCapturedRef.current = false;
    pointerIdRef.current = null;
    hasDraggedRef.current = false;
    setIsDragging(false);
  };

  const activeIndex = slideWidth
    ? Math.floor(offset / slideWidth) % totalSlides
    : 0;

  return (
    <section
      ref={containerRef}
      className="relative mx-auto w-[95%] sm:w-[90%] h-full select-none overflow-hidden rounded-[40px] border border-white/10 bg-[#101521] p-5 font-[Inter,sans-serif] shadow-[0_30px_60px_rgba(15,23,42,0.55)] aspect-[16/9]"
    >
      <div
        ref={trackRef}
        className="flex h-full gap-3 cursor-grab items-stretch touch-pan-y will-change-transform sm:gap-5 active:cursor-grabbing"
        style={{ transform: `translateX(-${offset}px)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={() => finishPointerInteraction(true)}
        onPointerCancel={() => finishPointerInteraction(true)}
        onPointerLeave={() => {
          if (pointerActiveRef.current && !pointerCapturedRef.current) {
            finishPointerInteraction(false);
          }
        }}
      >
        {duplicatedNews.map((news, index) => (
          <div
            key={`${news.article_id}-${index}`} 
            className="flex h-full w-full flex-none gap-10"
          >
            <Card
              {...news}
              allowClickRef={allowClickRef}
              onTextHoverStart={() => setIsTextHovered(true)}
              onTextHoverEnd={() => setIsTextHovered(false)}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-3">
        {newsList.map((item, idx) => (
          <button
            key={`dot-${item.article_id}-${idx}`}
            type="button"
            onClick={() => handleDotClick(idx)}
            className={`h-3 w-3 rounded-full transition duration-200 ${
              idx === activeIndex ? "scale-125 bg-white" : "bg-white/40"
            } transition duration-300 cursor-pointer hover:scale-130`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeBannerCarousel;