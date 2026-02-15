import { useLocation } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, memo } from "react";
import { formattedDate } from "../../../utils/date";
import { savePost, removePost } from "../../../redux/features/savedPostsSlices";
import { addParams, removeParams} from "../../../redux/features/suggestionSlices";

import { countries } from "../../../api/countries";
import { languages } from "../../../api/languages";

import newsImg from '../../../assets/images/news.jpg'

import ToolTip from "./ToolTip";

const NewsCard = ({
  article_id,
  link,
  title,
  pubDate,
  category,
  image_url,
  source_name,
  language,
  country
}) => {
  const [saved, setSaved] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const savedPosts = useSelector((state) => state.savedPosts.posts);

  useEffect(() => {
   setSaved(checkIfPostSaved(savedPosts, article_id));
  }, [savedPosts, article_id]);

  const iconStyles =
    "text-white text-[22px] w-full transition-all duration-300 group-hover:scale-120";

  const handleSave = (e) => {
    e.stopPropagation();
    const params = getPostParams();
    dispatch(savePost({ article_id, link, title, pubDate, category, image_url, source_name }));
    dispatch(addParams(params));
    setSaved(true);
  };

  const handleUnsave = (e) => {
    e.stopPropagation();
    console.log(title)
    dispatch(removePost(savedPosts.find(post => post.link === link).article_id));
    dispatch(removeParams(article_id));
    setSaved(false);
  };

  const checkIfPostSaved = () => {
    return savedPosts.some(
      (post) => post.article_id === article_id
    );
  }

  const getPostParams = () => {
    const countryCode = countries.find(c => country[0].toUpperCase() === c.name).code;
    const languageCode = languages.find(l => language === l.name.toLowerCase()).code;

    return `&category=${category[0]}&country=${countryCode}&language=${languageCode}`
  }

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = newsImg;
  }

  const bookMarkIcon = saved ? (
    <FaBookmark className={iconStyles} onClick={handleUnsave} />
  ) : (
    <FaRegBookmark className={iconStyles} onClick={handleSave} />
  );

  return (
    <div className="rounded-t-[10px] overflow-hidden shadow-md transition duration-300 hover:-translate-y-2.5 hover:shadow-2xl relative h-[400px] pb-5 bg-(--surface)">
      <div className="relative w-full h-auto sm:h-[380px] md:h-[200px]">
        <img src={image_url || newsImg} onError={handleImageError} className="h-full w-full" />
        <span className="py-1.5 px-2.5 bg-[#147d83] uppercase text-white absolute bottom-0 rounded-tr-[10px] text-[12px] font-bold tracking-[0.5px]">
          {category[0]}
        </span>
        <div className="absolute group top-0 right-0 w-10 h-10 bg-black/60 flex justify-center items-center transition-all duration-300 cursor-pointer hover:bg-[#75bcad]">
          {pathname == "/saved" ? (
            <FaTrash className={iconStyles} onClick={handleUnsave} />
          ) : (
            bookMarkIcon
          )}
        </div>
      </div>
      <div className="group p-[15px] flex flex-col gap-y-[18px] justify-center h-auto">
        <div className="opacity-0 flex absolute bottom-1 left-1 right-1 rounded-2xl md:group-hover:bg-(--tooltip) justify-center items-center transition-all duration-300 md:group-hover:opacity-100">
          <ToolTip link={link} />
        </div>
        <h6 className="cursor-pointer group">
          <a
            href={link}
            target="_blank"
            className="text-[18px] font-medium text-(--text-primary) tracking-[1px] hover:underline line-clamp-4"
          >
            {title}
          </a>
        </h6>
        <div className="flex justify-between items-center text-[14px] absolute bottom-3 group-hover:bottom-11 transition-all duration-300 left-0 font-normal tracking-[1px] w-full px-[15px] text-(--text-muted)">
          <span> {formattedDate(pubDate).split(" ").slice(0,3).join(" ")} </span>
          <span> by {source_name} </span>
        </div>
      </div>
    </div>
  );
};

export default memo(NewsCard);