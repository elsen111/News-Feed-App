import Navbar from "../Navbar";
import Logo from "../Logo";
import LoginLink from "./LoginLink";
import { RiMenuUnfold4Fill } from "react-icons/ri";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function HeaderNav({ menuState, closeMenu }) {
  const navbarRef = useRef();
  const location = useLocation()

  // To close the navbar when clicking outside except it for mobile view
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

  // To close the navbar by default when navigating between pages for mobile view
  useEffect(() => {
    closeMenu()
  }, [location.pathname])

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
