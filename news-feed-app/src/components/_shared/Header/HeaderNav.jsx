import Navbar from "../Navbar";
import Logo from "../Logo";
import LoginLink from "./LoginLink";
import { RiMenuUnfold4Fill } from "react-icons/ri";
import { useEffect, useRef } from "react";

export default function HeaderNav({ menuState, closeMenu }) {
  const navbarRef = useRef();

  useEffect(() => {
      const handleClick = (e) => {
          if (!navbarRef.current.contains(e.target)) {
          closeMenu();
        }
      }

      if(menuState) {
        window.addEventListener('mousedown', handleClick)
      }

    return () =>
      window.removeEventListener("mousedown", handleClick);
  }, [menuState]);

  const links = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "Categories",
      path: "/categories",
    },

    {
      name: "For You",
      path: "/suggested",
    },

    {
      name: "Saved",
      path: "/saved",
    },
  ];

  return (
    <div
      ref={navbarRef}
      className={`
        ${menuState ? "translate-x-0" : "-translate-x-full"}
        absolute top-0 z-1000 left-0 w-[75%] flex flex-col sm:w-[40%] md:w-[40%] h-screen bg-primary-2 p-5 xl:p-0 xl:bg-transparent xl:h-fit xl:static xl:w-auto xl:translate-none transition-all duration-700
      `}
    >
      <RiMenuUnfold4Fill
        size={34}
        // color="#555"
        className="absolute right-2 cursor-pointer xl:hidden text-primary1"
        onClick={closeMenu}
      />
      <div className="block xl:hidden pt-10">
        <Logo parentComponent={"Header"} menuState={menuState} />
      </div>

      <Navbar links={links} parentComponent="Header" />

      <div className="block px-4 sm:hidden">
        <LoginLink />
      </div>
    </div>
  );
}
