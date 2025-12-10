import { useRef, useEffect } from "react";

export default function FilterModal({modalOpen, handleCloseModal}) {
  const modalRef = useRef();

  useEffect(() => {
    const handlePosition = () => {
      if (window.innerWidth > 640) {
        if (window.scrollY > 20) {
          modalRef.current.style.top = "129px";
        } else {
          modalRef.current.style.top = "139px";
        }
      }
    };

    window.addEventListener("scroll", handlePosition);

    return () => window.removeEventListener("scroll", handlePosition);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
        if(modalRef.current && !modalRef.current.contains(e.target)) {
            handleCloseModal()
        }
    }
    
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [modalOpen])

  return (
    <section
      ref={modalRef}
      className={`${modalOpen ? "translate-x-0" : "-translate-x-140"} bg-gray-500 fixed w-full sm:w-[70%] md:w-[50%] lg:w-[35%] 
      h-fit top-[108px] sm:top-[119px] md:top-[139px] left-0 transition-all rounded-[10px] duration-500`}
    >
      FilterModal
    </section>
  );
}
