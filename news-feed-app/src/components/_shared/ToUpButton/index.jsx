import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ToUpButton = () => {
  const btnRef = useRef();
  const [lastPointY, setLastPointY] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleDisplay = () => {
      const currentPointY = window.scrollY;

      if(currentPointY < lastPointY && currentPointY > 400) {
        setShow(true);
      } else {
        setShow(false);
      }

      setLastPointY(currentPointY);
    };

    window.addEventListener("scroll", handleDisplay);

    return () => window.removeEventListener("scroll", handleDisplay);
  }, [lastPointY]);

  return (
    <a
      href="#root"
      className={`
        flex justify-center items-center opacity-0 bg-[#2a7ca9] rounded-[50%] fixed bottom-2.5 right-2.5 w-10 h-10 z-3 transition-all duration-300
        hover:opacity-100! hover:rounded-[20%] hover:shadow-2xl
        ${show ? 'opacity-60' : 'opacity-0 pointer-events-none'}
      `}
    >
      <IoIosArrowUp className="text-white" />
    </a>
  );
};

export default ToUpButton;
