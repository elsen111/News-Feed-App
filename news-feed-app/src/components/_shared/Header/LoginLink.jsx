import { Link } from "react-router-dom";

export default function LoginLink() {
  return (
    <Link to={"/login"}
      className="text-[16px] block h-full xl:text-[18px] py-1.5 px-[26px] bg-[#138c7e] border-2 rounded-md border-[#138c7e] transition duration-300 text-white capitalize font-bold link capitalized fs-16 fw-700 hover:bg-white hover:text-[#555]"
    >
      sign in
    </Link>
  );
}
