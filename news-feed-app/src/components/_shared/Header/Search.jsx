import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoSearchCircle } from "react-icons/io5";
import SearchModal from "./SearchModal";

export default function Search({ headerRef }) {
  const location = useLocation();
  const [modalState, setModalState] = useState(false);
  const modalRef = useRef();

  const handleToggle = (e) => {
    e.stopPropagation()
    setModalState((prevState) => !prevState)
  }

  useEffect(() => {
    setModalState(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        !headerRef.current.contains(e.target) &&
        !modalRef.current.contains(e.target) 
      ) {
        setModalState(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [modalState]);

  return (
    <div>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={handleToggle}
      >
        {modalState ? (
          <div className="text-black/55 py-1 italic px-2 rounded-2xl bg-blue-200 transition-all duration-300 hover:shadow-md hover:shadow-blue-300">
            Close Search
          </div>
        ) : (
          <IoSearchCircle className="text-[45px] text-search-icon transition-all duration-300 hover:scale-125" />
        )}
      </div>

      <div ref={modalRef}>
        <SearchModal modalState={modalState} />
      </div>
    </div>
  );
}
