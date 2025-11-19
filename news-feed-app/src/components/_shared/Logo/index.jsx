import logo from "../../../assets/images/logo.jpg";
import { NavLink } from "react-router-dom";

export default function Logo({ parentComponent, menuState }) {
  // In the Header component the image is bigger than the Footer compoenent
  const imgDimension = parentComponent === "Header" ? "md:w-[65px] md:h-[65px]" : "md:w-[55px] md:h-[55px]";
  return (
    <div className="flex items-center">
      <h1 className="text-[28px] md:text-[35px] font-bold">
        <NavLink to={"/"} className="flex items-center gap-2">
          <div
            className={`w-[45px] h-[45px] ${imgDimension} ${imgDimension} flex items-center`}
          >
            <img
              src={logo}
              alt="website logo"
              className="block w-full rounded-full"
            />
          </div>
          <span className={`${(parentComponent === "Header"  &&  !menuState) && "hidden" } text-[#15eadf] sm:inline`}> Pulse </span>
          <span className={`${(parentComponent === "Header"  &&  !menuState) && "hidden" } text-[#00f2b9] sm:inline`}> Wire </span>
        </NavLink>
      </h1>
    </div>
  );
}
