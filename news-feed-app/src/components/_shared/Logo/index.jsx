import logo from "../../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

export default function Logo({ parentComponent }) {
  // In the Header component the image is bigger than the Footer compoenent
  const imgDimension = parentComponent === "Header" ? "75px" : "55px";
  return (
    <div className="flex items-center">
      <div
        className={`w-[55px] h-[55px] md:w-[${imgDimension}] md:h-[${imgDimension}]`}
      >
        <img
          src={logo}
          alt="website logo"
          className="block w-full rounded-full"
        />
      </div>
      <h1 className="text-[28px] md:text-[35px] font-bold flex gap-0">
        <NavLink to={"/"}>
          <span className="text-[#367774]"> Nova </span>
          <span className="text-[#67a193]"> Tra </span>
        </NavLink>
      </h1>
    </div>
  );
}
