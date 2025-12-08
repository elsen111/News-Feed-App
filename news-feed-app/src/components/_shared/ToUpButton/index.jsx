import { useEffect, useRef } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ToUpButton = () => {
  const btnRef = useRef();

  useEffect(() => {
    const handleDisplay = () => {
      if (window.scrollY > 600) {
        btnRef.current.style.opacity = "0.6";
      } else {
        btnRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("scroll", handleDisplay);

    return () => window.removeEventListener("scroll", handleDisplay);
  }, []);

  return (
    <a
      href="#root"
      ref={btnRef}
      className="
        flex justify-center items-center opacity-0 bg-[#2a7ca9] rounded-[50%] fixed bottom-2.5 right-2.5 w-10 h-10 z-3 transition-all duration-300
        hover:opacity-100! hover:rounded-[20%] hover:shadow-2xl
      "
    >
      <IoIosArrowUp className="text-white" />
    </a>
  );
};

export default ToUpButton;
