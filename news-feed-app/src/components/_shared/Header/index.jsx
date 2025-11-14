import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import LoginLink from "./LoginLink";
import HeaderNav from "./HeaderNav";

export default function Header() {
  return (
    <>
      {/* Navigation Links */}
      {/* <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ margin: "0 10px" }}>
          Home
        </Link>
        <Link to="/category" style={{ margin: "0 10px" }}>
          Category
        </Link>
        <Link to="/suggested" style={{ margin: "0 10px" }}>
          Suggested
        </Link>
        <Link to="/saved" style={{ margin: "0 10px" }}>
          Saved
        </Link>
      </nav> */}

      <header className="fixed flex justify-center top-0 left-0 right-0 bg-primary-1 border border-b-[#b4b4b4] z-20 sm:z-5">
        <div className="h-[60px] sm:h-[70px] md:h-[90px] w-[95%] min-w-auto xl:w-[93%] xl:min-w-[1140px] flex flex-wrap items-center justify-between text-center transition-all duration-300 relative">
          <div>
            <div className="menu-bar-container text-primary-color">
              <i className="fa-solid fa-bars"></i>
            </div>
            <Logo parentComponent="Header" />
          </div>

          <HeaderNav />
          <LoginLink />

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

          {/* <!-- Dark / Light Mode --> */}
          {/* <div className="dark-light-mode-box flex flex-end pointer">
                <img
                  src="../img/light-mode.png"
                  className="mode-img f-height transition"
                  alt="light mode icon"
                />
              </div> */}
          {/* </div> */}
          {/* </div> */}

          {/* <!-- Menu Bar --> */}
        </div>
      </header>
    </>
  );
}
