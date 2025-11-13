import { Link } from "react-router-dom";

export default function LoginLink() {
  return (
    <Link to={"/login"}
      className="text-[16px] xl:text-[18px] py-1.5 px-[26px] bg-[#138c7e] border-2 rounded-md border-[#138c7e] transition duration-300 text-white capitalize font-bold link capitalized fs-16 fw-700 white hover:bg-white hover:text-primary-2"
    >
      sign in
    </Link>
  );
}
