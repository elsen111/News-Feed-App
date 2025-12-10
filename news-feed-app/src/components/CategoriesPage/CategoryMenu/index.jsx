import { useEffect, useRef } from "react";

export default function CategoryMenu() {
  const menuRef = useRef();

  const categories = [
    {
      title: "politics & world",
      code: "",
    },

    {
      title: "business & economy",
      code: "",
    },

    {
      title: "science & technology",
      code: "",
    },

    {
      title: "lifestyle & culture",
      code: "",
    },
    {
      title: "health & education",
      code: "",
    },
  ];

    useEffect(() => {
      const handlePosition = () => {
        if (window.innerWidth > 640) {
          if (window.scrollY > 20) {
            menuRef.current.style.top = "80px";
          } else {
            menuRef.current.style.top = "90px";
          }
        }
      };
  
      window.addEventListener("scroll", handlePosition);
  
      return () => window.removeEventListener("scroll", handlePosition);
    }, []);

  return (
    <nav ref={menuRef} className="sticky transition-all px-7 overflow-hidden duration-300 top-[60px] sm:top-[70px] md:top-[90px] w-full py-2 mb-3 z-1 shadow-2xl bg-(--color-category-menu)">
      <div className="gap-10 flex justify-around w-full h-full scroll-hidden overflow-auto lg:overflow-hidden">
      {categories.map((category) => {
        return (
          <button key={category.title[0]} className="text-[16px] flex-none transition-all duration-300 py-1 px-2 rounded-[5px] cursor-pointer capitalize hover:scale-110 hover:opacity-90">
            {category.title}
          </button>
        );
      })}
      </div>
    </nav>
  );
}
