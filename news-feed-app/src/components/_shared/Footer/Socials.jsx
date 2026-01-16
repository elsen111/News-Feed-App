import { FaYoutube } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RxLinkedinLogo } from "react-icons/rx";

const Socials = () => {
  return (
    <div className="flex justify-center items-center gap-[26px] text-[26px] text-(--text-muted)">
        <a className="px-1 transition-all duration-300 hover:scale-125 hover:text-[#c4302b]" href=""> <FaYoutube /> </a>
        <a className="px-1 transition-all duration-300 hover:scale-125 hover:text-[#ff0069]" href=""> <IoLogoInstagram /> </a>
        <a className="px-1 transition-all duration-300 hover:scale-125 hover:text-[#1877f2]" href=""> <FaFacebook /> </a>
        <a className="px-1 transition-all duration-300 hover:scale-125 hover:text-[#1da1f2]" href=""> <FaXTwitter /> </a>
        <a className="px-1 transition-all duration-300 hover:scale-125 hover:text-[#0077b5]" href=""> <RxLinkedinLogo /> </a>
    </div>
  )
}

export default Socials