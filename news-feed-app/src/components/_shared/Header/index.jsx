import React from "react";
import { Link } from "react-router-dom";
import logo from '../../../assets/images/logo.png'

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
        <div className="h-[60px] sm:h-[70px] md:h-[90px] w-[95%] min-w-auto xl:w-[93%] xl:min-w-[1140px] flex items-center justify-between text-center transition-all duration-300 relative">
          {/* <!-- Logo and Title --> */}
          <div className="gap-5 flex items-center">
            <div className="w-[55px] h-[55px] md:w-[75px] md:h-[75px]">
              <img
                src={logo}
                alt="website logo"
                className="block h-full w-full rounded-full"
              />
            </div>
            <h1 className="title fs-35 fw-700">
              <span> Nova </span>
              <span> Tra </span>
            </h1>
          </div>

          {/* <!-- Main Navigation --> */}
          <div className="top-menu flex sp-between transition relative after">
            <div className="x-mark-container">
              <i className="fa-solid fa-xmark text-primary-color"></i>
            </div>

            <div className="header-nav-container transition">
              <nav className="header-nav f-height flex">
                <ul className="navbar-list flex list">
                  <li>
                    <a
                      href="#"
                      className="active-link text-primary-color capitalized fs-16 fw-700 link relative after block transition"
                    >
                      {" "}
                      home{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="./categories.html"
                      className="text-primary-color capitalized fs-16 fw-700 link relative after block transition"
                    >
                      {" "}
                      explore all{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="./suggested.html"
                      className="text-primary-color capitalized fs-16 fw-700 link relative after block transition"
                    >
                      {" "}
                      for you{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="./saved.html"
                      className="text-primary-color capitalized fs-16 fw-700 link relative after block transition"
                    >
                      {" "}
                      saved{" "}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="right-side f-height flex">
              {/* <!-- Search Box --> */}
              <div className="search-box-container transition">
                <div className="relative transition f-height f-width flex flex-end">
                  <input
                    type="text"
                    name="search-box"
                    className="block f-height fs-16 transition search-box"
                    placeholder="Search news..."
                  />
                  <i className="fa-duotone fa-solid fa-magnifying-glass search-icon pointer transition text-primary-color flex flex-centered"></i>
                </div>
              </div>

              {/* <!-- Registration Button --> */}
              <div className="registration">
                <a
                  href="./login.html"
                  className="link capitalized fs-16 fw-700 white transition"
                >
                  {" "}
                  sign in{" "}
                </a>
              </div>

              {/* <!-- Dark / Light Mode --> */}
              <div className="dark-light-mode-box flex flex-end pointer">
                <img
                  src="../img/light-mode.png"
                  className="mode-img f-height transition"
                  alt="light mode icon"
                />
              </div>
            </div>
          </div>

          {/* <!-- Menu Bar --> */}
          <div className="menu-bar-container text-primary-color">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </header>
    </>
  );
}
