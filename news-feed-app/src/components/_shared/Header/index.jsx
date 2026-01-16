import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { RiMenuUnfold3Fill } from "react-icons/ri";
import Logo from "../Logo";
import LoginLink from "./LoginLink";
import HeaderNav from "./HeaderNav";
import Theme from "./Theme";
import Search from "./Search";

export default function Header() {
  const [menuState, SetMenuState] = useState(false);
  const headerRef = useRef();
  const { pathname } = useLocation();

  const openMenu = () => SetMenuState(true);
  const closeMenu = () => {
    SetMenuState(false);
  };

  useEffect(() => {
    if (menuState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuState]);

  useEffect(() => {
    const handleHeight = () => {
      if (window.innerWidth > 640) {
        if (window.scrollY > 20) {
          headerRef.current.style.height = "80px";
        } else {
          headerRef.current.style.height = "90px";
        }
      }
    };

    window.addEventListener("scroll", handleHeight);

    return () => window.removeEventListener("scroll", handleHeight);
  }, []);
 
  return (
    <>
      <header
        ref={headerRef}
        className={`fixed flex justify-center top-0 left-0 right-0 transition-all duration-300 bg-(--header) border-b border-(--border) z-20 sm:z-5
         ${
           menuState
             ? " after:opacity-100 after:pointer-events-auto"
             : "after:opacity-0 after:pointer-events-none"
         }
         after:transition-opacity after:h-screen after:duration-500 after:content-[''] after:w-screen after:bg-black/70 after:absolute after:z-0 after:top-0 after:left-0`}
      >
        <div className="h-[60px] sm:h-[70px] md:h-[90px] w-[95%] min-w-auto xl:w-[93%] xl:min-w-[1140px] flex flex-wrap items-center justify-between text-center transition-all duration-300">
          <div className="flex items-center justify-start gap-1 sm:gap-4">
            <RiMenuUnfold3Fill
              size={34}
              className="block cursor-pointer xl:hidden text-(--text-primary)"
              onClick={openMenu}
            />

            <Logo parentComponent="Header" />
          </div>

          <HeaderNav menuState={menuState} closeMenu={closeMenu} />

          <div className="flex items-center gap-2 sm:gap-5">
            {pathname !== "/saved" && <Search headerRef={headerRef} />}
            <div className="hidden sm:block">
              <LoginLink />
            </div>
            <Theme />
          </div>
        </div>
      </header>
    </>
  );
}
