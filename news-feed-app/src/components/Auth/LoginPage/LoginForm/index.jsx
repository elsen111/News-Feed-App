import { useState, useRef } from "react";
import { MdEmail } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import InputContainer from "../../_shared/InputContainer";
import Checkbox from "../../_shared/Checkbox";
import Prompt from "../../_shared/Prompt";
import AnimatedForm from "../../_shared/AnimatedForm";

export default function LoginContent() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState({});
  const [authenticated, setAuthenticated] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const inputRefs = useRef({});
  const navigate = useNavigate();

  const handlePasswordVisibility = (e) => {
    e.stopPropagation();
    setPasswordVisible((prev) => !prev);
    inputRefs.current.password.focus();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isUserMatching = existingUsers.some(user => (user.email === userData.email && user.password === userData.password ));
    setAuthenticated(isUserMatching);

    const currentErrors = {};
    const letters = /[A-Za-z]/;
    const numbers = /\d/;
    const specialChars = /[^A-Za-z0-9]/;

    if (!userData.email) {
      currentErrors.email = "*Email is required.";
    } else if (!userData.email.includes("@gmail.com")) {
      currentErrors.email = "*Email must contain '@gmail.com' suffixe.";
    }

    if (!userData.password) {
      currentErrors.password = "*Password is required.";
    } else if (userData.password.length < 8) {
      currentErrors.password =
        "*Password should contain at least 8 characters (mix of special characters, letters and numbers).";
    } else if (
      !letters.test(userData.password) ||
      !numbers.test(userData.password) ||
      !specialChars.test(userData.password)
    ) {
      switch (true) {
        case !letters.test(userData.password) &&
          !numbers.test(userData.password):
          currentErrors.password =
            "*Password should contain at least one letter and one number";
          break;

        case !letters.test(userData.password) &&
          !specialChars.test(userData.password):
          currentErrors.password =
            "*Password should contain at least one letter and one special character";
          break;

        case !letters.test(userData.password) &&
          !specialChars.test(userData.password):
          currentErrors.password =
            "*Password should contain at least one number and one special character";
          break;

        case !letters.test(userData.password):
          currentErrors.password =
            "*Password should contain at least one letter";
          break;

        case !numbers.test(userData.password):
          currentErrors.password =
            "*Password should contain at least one number";
          break;

        case !specialChars.test(userData.password):
          currentErrors.password =
            "*Password should contain at least one special character";
          break;

        default:
          break;
      }
    }

    setError(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      if(isUserMatching) {
        setSubmitting(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    }
  };

  return (
    <>
      {!authenticated && (
        <AnimatedForm
          distance={180}
          direction="vertical"
          reverse={true}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={0.9}
          threshold={0.2}
          delay={0.3}
          className="flex flex-col items-center border-2 border-red-300 bg-red-200 text-red-800 text-[14px] absolute 
          top-0 w-[80%] md:w-[300px]! h-[50px] left-[10%] md:left-[80%] p-5 sm:p-7 justify-center shadow-2xl rounded-2xl"
        >
          <p className="text-center"> Email or password is incorrect </p>
        </AnimatedForm>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-start gap-[30px]"
      >
        <InputContainer label="email">
          <input
            ref={(el) => (inputRefs.current.email = el)}
            type="email"
            name="email"
            className="text-[#205167] text-[15px] w-full h-full transition-all duration-500 py-2.5 px-[15px] border-2 border-primary-1/30 rounded-lg focus:border-[#62aacb] focus:shadow-lg"
            id="email"
            value={userData.email ? userData.email : ""}
            onChange={handleInputChange}
          />
          <MdEmail
            onClick={() => {
              inputRefs.current.email.focus();
            }}
            size={20}
            className="absolute top-[11px] right-[15px]"
          />

          {error.email && (
            <p className="text-[#d63a3a] text-[12px] mt-1"> {error.email} </p>
          )}
        </InputContainer>

        <InputContainer label="password">
          <input
            ref={(el) => (inputRefs.current.password = el)}
            type={passwordVisible ? "text" : "password"}
            name="password"
            className="text-[#205167] text-[15px] w-full h-full transition-all duration-500 py-2.5 px-[15px] border-2 border-primary-1/30 rounded-lg focus:border-[#62aacb] focus:shadow-2xl"
            id="password"
            value={userData.password ? userData.password : ""}
            onChange={handleInputChange}
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
          {error.email && (
            <p className="text-[#d63a3a] text-[12px] mt-1"> {error.email} </p>
          )}
        </InputContainer>

        <div className="flex justify-between items-center w-full">
          <Checkbox label="Keep me logged in" initialChecked={true} />
          <a
            href="#"
            className="text-primary-1 text-sm hover:text-[#62aacb] transition-all duration-300"
          >
            {" "}
            Forgot password?{" "}
          </a>
        </div>

        <button
          type="submit"
          className="bg-[#246fe8] transition-all duration-300 text-primary-2 h-[33px] w-[90px] sm:h-10 sm:w-28 rounded-lg cursor-pointer hover:scale-90 hover:opacity-90"
        >
          {submitting ? (
            <div className="mx-auto border-3 border-primary-2 border-t-primary-2/40 rounded-full bg-transparent animate-spin h-[19px] w-[19px]"></div>
          ) : (
            "Sign up"
          )}
        </button>
      </form>

      <Prompt
        warningText="Don't have an account?"
        linkPath="/auth/signup"
        linkContent="Sign up"
      />
    </>
  );
}
