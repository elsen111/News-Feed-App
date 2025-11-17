import { useContext } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { ThemeContext } from "../../../pages/layout";

const Theme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;

      case "dark":
        setTheme("light");

      default:
        break;
    }
  };

  console.log(theme);
  return (
    <div
      onClick={changeTheme}
      className="flex relative items-center cursor-pointer h-10 border-[3px] border-[#ccc] rounded-[18px] w-[60px] sm:w-[70px] bg-[#eee]"
    >
      <div className={`
        w-[50%] h-full flex items-center relative transition duration-300
        ${theme === "light" ? "translate-x-0" : "translate-x-full"}
    `}>
        <MdDarkMode
          size={25}
          className={`
            w-full absolute right-0 transition duration-300
            ${theme === "light" ? "opacity-0" : "opacity-100"}
        `}
        />
        <CiLight size={30} className={`
            w-full absolute right-0 transition duration-300
            ${theme === "dark" ? "opacity-0" : "opacity-100"}
        `} />
      </div>
    </div>
  );
};

export default Theme;
