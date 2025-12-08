import { useLocation } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import ToolTip from "./ToolTip";

const NewsCard = ({
  link,
  title,
  pubDate,
  category,
  image_url,
  source_name,
}) => {
  const [saved, setSaved] = useState(false);
  const { pathname } = useLocation();
  const iconStyles =
    "text-white text-[22px] w-full transition-all duration-300 group-hover:scale-120";

  const handleSave = () => {
    setSaved(true);
  };

  const handleUnsave = () => {
    setSaved(false);
  };

const bookMarkIcon = saved ? (
    <FaBookmark className={iconStyles} onClick={handleUnsave} />
  ) : (
    <FaRegBookmark className={iconStyles} onClick={handleSave} />
  );

  return (
    <div className="rounded-t-[10px] overflow-hidden shadow-md transition duration-300 hover:-translate-y-2.5 hover:shadow-2xl">
      <div className="relative w-full h-auto sm:h-[380px] md:h-[200px]">
        <img src={image_url} className="h-full w-full" />
        <span className="py-1.5 px-2.5 bg-[#147d83] uppercase text-white absolute bottom-0 rounded-tr-[10px] text-[12px] font-bold tracking-[0.5px]">
          {category}
        </span>
        <div className="absolute group top-0 right-0 w-10 h-10 bg-black/60 flex justify-center items-center transition-all duration-300 cursor-pointer hover:bg-[#75bcad]">
          {pathname == "/saved" ? (
            <FaTrash className={iconStyles} />
          ) : (
            bookMarkIcon
          )}
        </div>
      </div>
      <div className="group p-[15px] flex flex-col gap-y-[18px] justify-center relative">
        <div className="opacity-0 flex absolute left-0 h-full w-full transition-all duration-300 md:group-hover:opacity-100"> <ToolTip link={link} /> </div>
        <h6 className="cursor-pointer">
          <a
            href={link}
            target="_blank"
            className="text-[18px] font-medium tracking-[1px] hover:underline"
          >
            {title}
          </a>
        </h6>
        <div className="flex justify-between items-center text-[14px] font-normal tracking-[1px]">
          <span> {pubDate} </span>
          <span> by {source_name} </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
