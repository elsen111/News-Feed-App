import logo from "../../../assets/images/logo.jpg";
import { NavLink } from "react-router-dom";

export default function Logo({ parentComponent, menuState }) {
  // In the Header component the image is bigger than the Footer compoenent
  const imgDimension = parentComponent === "Header" ? "75px" : "55px";
  return (
    <div className="flex items-center">
      <h1 className="text-[28px] md:text-[35px] font-bold">
        <NavLink to={"/"} className="flex items-center gap-0">
          <div
            className={`w-[55px] h-[55px] md:w-[${imgDimension}] md:h-[${imgDimension}]`}
          >
            <img
              src={logo}
              alt="website logo"
              className="block w-full rounded-full"
            />
          </div>
          <span className={`${(parentComponent === "Header"  &&  !menuState) && "hidden" } text-[#367774] sm:inline`}> Pulse </span>
          <span className={`${(parentComponent === "Header"  &&  !menuState) && "hidden" } text-[#67a193] sm:inline`}> Wire </span>
        </NavLink>
      </h1>
    </div>
  );
}
