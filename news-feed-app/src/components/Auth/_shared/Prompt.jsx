import { Link } from "react-router-dom";

export default function Prompt({warningText, linkPath, linkContent}) {
  return (
    <p className="text-(--form) mt-5 text-[14px]">
        <span> {warningText} </span>
        <Link to={linkPath} className="transition-all duration-300 hover:text-[#62aacb]"> {linkContent} </Link>
    </p>
  )
}
