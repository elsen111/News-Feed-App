import { FaArrowRight } from "react-icons/fa6";

const ToolTip = ({ link }) => {
  return (
    <a
      href={link}
      target="_blank"
      className="cursor-pointer flex gap-1 justify-center bg-emerald-950/80 w-full h-full items-center text-white text-[20px]"
    >
      <span className="group-hover:scale-100 scale-50 transition-all duration-300">Read more</span>
      <span className="opacity-0 duration-1000 group-hover:translate-x-5 group-hover:opacity-100">
        <FaArrowRight />
      </span>
    </a>
  );
};

export default ToolTip;
