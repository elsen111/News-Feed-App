import { useState, useRef } from "react";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import InputContainer from "../../_shared/InputContainer";
import Checkbox from "../../_shared/Checkbox";
import Prompt from "../../_shared/Prompt";

export default function SignupContent() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputRefs = useRef({});

  const handlePasswordVisibility = (e) => {
    e.stopPropagation();
    setPasswordVisible((prev) => !prev);
    inputRefs.current.password.focus();
  };

  return (
    <>
      <form className="flex flex-col justify-center items-start gap-[30px]">
        <InputContainer label="full name">
          <input
            ref={(el) => (inputRefs.current.fullname = el)}
            type="text"
            name="fullname"
            className="text-[#205167] text-[15px] w-full h-full transition-all duration-500 py-2.5 px-[15px] border-2 border-primary-1/30 rounded-lg focus:border-[#62aacb] focus:shadow-2xl"
            id="email"
          />
          <IoPerson
            onClick={() => {
              inputRefs.current.fullname.focus();
            }}
            size={20}
            className="absolute top-[11px] right-[15px]"
          />
        </InputContainer>
        <InputContainer label="email">
          <input
            ref={(el) => (inputRefs.current.email = el)}
            type="email"
            name="email"
            className="text-[#205167] text-[15px] w-full h-full transition-all duration-500 py-2.5 px-[15px] border-2 border-primary-1/30 rounded-lg focus:border-[#62aacb] focus:shadow-2xl"
            id="email"
          />
          <MdEmail
            onClick={() => {
              inputRefs.current.email.focus();
            }}
            size={20}
            className="absolute top-[11px] right-[15px]"
          />
        </InputContainer>

        <InputContainer label="password">
          <input
            ref={(el) => (inputRefs.current.password = el)}
            type={passwordVisible ? "text" : "password"}
            name="password"
            className="text-[#205167] text-[15px] w-full h-full transition-all duration-500 py-2.5 px-[15px] border-2 border-primary-1/30 rounded-lg focus:border-[#62aacb] focus:shadow-2xl"
            id="email"
          />
          {passwordVisible ? (
            <IoEye
              size={21}
              className="cursor-pointer absolute top-[11px] right-[15px]"
              onClick={handlePasswordVisibility}
            />
          ) : (
            <IoEyeOff
              size={21}
              className="cursor-pointer absolute top-[11px] right-[15px]"
              onClick={handlePasswordVisibility}
            />
          )}
        </InputContainer>

        <div className="flex justify-between items-center w-full">
          <Checkbox label="Keep me logged in" initialChecked={true} />
          <a
            href="#"
            className="text-primary-1 text-sm hover:text-[#62aacb] transition-all duration-300"
          >
            Forgot password?
          </a>
        </div>

        <button className="bg-[#246fe8] transition-all duration-300 text-primary-2 h-[33px] w-[90px] sm:h-10 sm:w-28 rounded-lg cursor-pointer hover:scale-90 hover:opacity-90">
          Sign up
        </button>
      </form>

      <Prompt
        warningText="Already have an account?"
        linkPath="/auth/login"
        linkContent="Sign in"
      />
    </>
  );
}
