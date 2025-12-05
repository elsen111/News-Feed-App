import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { homeLoader } from "../../../api/loaders";
import Card from "./Card";

const items = [
  { id: 1, color: "#f87171", label: "Item 1" },
  { id: 2, color: "#34d399", label: "Item 2" },
  { id: 3, color: "#60a5fa", label: "Item 3" },
  { id: 4, color: "#facc15", label: "Item 4" },
  { id: 5, color: "#a78bfa", label: "Item 5" },
];

const Carousel = () => {
  const newsList = [
    {
      link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydaniu-nowosci-wydawnicze-niaiu.read",
      title:
        "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
      pubDate: "2025-12-04",
      category: "politics",
      image_url: "../../../../public/images/dummy_pics/pic1.jpg",
      source_name: "Khazar News",
    },
    {
      link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydaniu-nowosci-wydawnicze-niaiu.read",
      title:
        "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
      pubDate: "2025-12-04",
      category: "politics",
      image_url: "../../../../public/images/dummy_pics/pic2.jpg",
      source_name: "Khazar News",
    },
    {
      link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydaniu-nowosci-wydawnicze-niaiu.read",
      title:
        "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
      pubDate: "2025-12-04",
      category: "politics",
      image_url: "../../../../public/images/dummy_pics/pic3.jpg",
      source_name: "Khazar News",
    },
    {
      link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydaniu-nowosci-wydawnicze-niaiu.read",
      title:
        "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
      pubDate: "2025-12-04",
      category: "politics",
      image_url: "../../../../public/images/dummy_pics/pic4.jpg",
      source_name: "Khazar News",
    },
    {
      link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydaniu-nowosci-wydawnicze-niaiu.read",
      title:
        "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
      pubDate: "2025-12-04",
      category: "politics",
      image_url: "../../../../public/images/dummy_pics/pic5.jpg",
      source_name: "Khazar News",
    },
  ];
  const [productList, setProductList] = useState([]);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);
  const speed = 1; // pixels per frame
  // const newsList = useLoaderData();

  // useEffect(() => {
  //   fetch("https://newsdata.io/api/1/latest?apikey=pub_e1cccdc48235436aabc537a2f0455c38&size=8")
  //   .then(response => response.json())
  //   .then(data => setProductList(data.results))
  //   console.log(productList);
  // }, []);

  // Duplicate items for seamless effect
  const carouselItems = [...items, ...items];

  // Measure container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setWidth(containerRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    console.log(homeLoader());
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
    <div
      className="h-full w-full"
      ref={containerRef}
      style={{ overflow: "hidden" }}
    >
      <div
        className="md:h-[96%] h-[94%] flex"
        ref={contentRef}
        style={{
          transform: `translateX(-${x}px)`,
          width: `${carouselItems.length * 100}%`,
        }}
      >
        {newsList.map((news) => {
          console.log(news);
          return (
            <div
              key={news.article_id}
              style={{
                minWidth: `${100 / carouselItems.length}%`,
                flexShrink: 0,
                // backgroundColor: item.color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontSize: "2rem",
              }}
              className="h-full"
            >
              <Card {...news} />
            </div>
          );
        })}
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
            className="w-2.5 h-2.5 sm:w-3 sm:h-3"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
