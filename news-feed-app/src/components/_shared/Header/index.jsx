import {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import { RiMenuUnfold3Fill } from "react-icons/ri";
import Logo from "../Logo";
import LoginLink from "./LoginLink";
import HeaderNav from "./HeaderNav";
import Theme from "./Theme";

export default function Header() {
  const [menuState, SetMenuState] = useState(false)

  const openMenu = () => SetMenuState(true);
  const closeMenu = () => {SetMenuState(false)};

  useEffect(() => {
    if (menuState) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [menuState])

  return (
    <>
      <header className={`fixed flex justify-center top-0 left-0 right-0 bg-light-theme border border-b-[#b4b4b4] z-20 sm:z-5
         ${menuState ? " after:opacity-100 after:pointer-events-auto" : "after:opacity-0 after:pointer-events-none"}
         after:transition-opacity after:h-screen after:duration-500 after:content-[''] after:w-screen after:bg-black/55 after:absolute after:z-0 after:top-0 after:left-0`}>
        <div className="h-[60px] sm:h-[70px] md:h-[90px] w-[95%] min-w-auto xl:w-[93%] xl:min-w-[1140px] flex flex-wrap items-center justify-between text-center transition-all duration-300">
          <div className="flex items-center justify-start gap-0.5 sm:gap-1">
            <RiMenuUnfold3Fill 
              size={34} 
              color="#555" 
              className="block cursor-pointer xl:hidden" 
              onClick={openMenu}
            />

            <Logo parentComponent="Header" />
          </div>

          <HeaderNav
            menuState = {menuState}
            closeMenu = {closeMenu}
          />

          <div className="flex items-center gap-2 sm:gap-5">
            <div className="hidden sm:block">
              <LoginLink />
            </div>
            <Theme />
          </div>


          {/* <!-- Main Navigation --> */}
          {/* <div className="top-menu flex sp-between transition relative after"> */}
          {/* <div className="x-mark-container">
              <i className="fa-solid fa-xmark text-primary-color"></i>
            </div> */}

          {/* <div className="right-side f-height flex"> */}
          {/* <!-- Search Box --> */}
          {/* <div className="search-box-container transition">
                <div className="relative transition f-height f-width flex flex-end">
                  <input
                    type="text"
                    name="search-box"
                    className="block f-height fs-16 transition search-box"
                    placeholder="Search news..."
                  />
                  <i className="fa-duotone fa-solid fa-magnifying-glass search-icon pointer transition text-primary-color flex flex-centered"></i>
                </div>
              </div> */}
        </div>
      </header>
    </>
  );
}
