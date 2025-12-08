import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

export default function MenuLink({name, path, parentComponent}) {
  const linkClasses = ({isActive}) => {
    const generalClasses = `py-5 px-[2] text-primary-1 w-fit transition duration-300 relative 
    font-bold xl:text-[16px] after:bg-primary-1 after:content-[''] after:absolute hover:after:w-full after:h-1 
    after:bottom-0 after:left-0 after:transition-all after:duration-300
    ${parentComponent === "Footer" ? "text-[16px] py-[10px]" : "text-[18px] py-5" }`
    const activeLinkClass = "after:w-full"
    const inactiveLinkClass = "after:w-0"

    return (
      isActive
        ? `${generalClasses} ${activeLinkClass}`
        : `${generalClasses} ${inactiveLinkClass}`
      )
  }

  return (
    <NavLink
      to={path}
      className={linkClasses}
    >
      {name}
    </NavLink>
  );
}
