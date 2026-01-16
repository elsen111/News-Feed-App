import { FaArrowRight } from "react-icons/fa6";

const ToolTip = ({ link }) => {
  return (
    <a
      href={link}
      target="_blank"
      className="cursor-pointer flex gap-1 justify-center w-full h-full! px-4 py-1 rounded-md items-center bg-(--tooltip) text-white text-[14px] hover:scale-x-95 group transition-all duration-300"
    >
      <span className="group-hover:scale-100 scale-50 transition-all duration-300 text-(--tooltip-text)">Read more</span>
      <span className="opacity-0 duration-1000 group-hover:translate-x-2 text-(--tooltip-text) group-hover:opacity-100">
        <FaArrowRight />
      </span>
    </a>
  );
};

export default ToolTip;
