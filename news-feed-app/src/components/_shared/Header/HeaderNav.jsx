import Navbar from "../Navbar";
import Logo from "../Logo";
import { RiMenuUnfold4Fill } from "react-icons/ri";

export default function HeaderNav({ menuState, closeMenu }) {
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
      className={`
      ${menuState ? "translate-x-0" : "-translate-x-full"}
       absolute top-0 left-0 w-[80%] h-screen bg-white p-5 xl:p-0 xl:bg-transparent xl:h-fit xl:static xl:w-auto xl:translate-none transition-all duration-700
    `}
    >
      <RiMenuUnfold4Fill
        size={34}
        color="#555"
        className="absolute right-2 xl:hidden"
        onClick={closeMenu}
      />
      <div className="block xl:hidden pt-10">
        <Logo parentComponent={"Header"} menuState={menuState} />
      </div>
      <Navbar links={links} parentComponent="Header" />
    </div>
  );
}
