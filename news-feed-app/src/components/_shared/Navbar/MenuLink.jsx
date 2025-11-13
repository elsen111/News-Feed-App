import { NavLink } from "react-router-dom";

export default function MenuLink({name, path}) {
  return (
    <NavLink
      to={path}
      className="text-[18px] py-5 px-[2] text-primary-2 w-fit transition duration-300 relative font-bold xl:text-[16px] 
        after:content-[''] after:absolute after:w-0 after:bg-primary-2 hover:after:w-full after:h-1 after:bottom-0 after:left-0 after:transition-all after:duration-300"
    >
      {name}
    </NavLink>
  );
}
