import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";
import AnimatedForm from "../components/Auth/_shared/AnimatedForm";
import authImg from "../assets/images/authImg.png";

export default function AuthLayout() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    () => clearInterval(timer, 3000);
  }, [pathname]);

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex items-center justify-center bg-blue-200">
          <HashLoader size={60} color="#147e85" />
        </div>
      ) : (
        <main className="h-screen overflow-hidden w-screen box-border p-5 bg-linear-to-br from-emerald-300 via-teal-300 to-sky-400 flex justify-between items-center gap-6">
          <AnimatedForm
            distance={180}
            direction="horizontal"
            reverse={true}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={0.9}
            threshold={0.2}
            delay={0.3}
            className="flex flex-col items-center w-full md:w-[48%] p-5 sm:p-7 justify-center shadow-2xl rounded-2xl bg-[#f7fafc] h-full"
          >
            <Outlet />
          </AnimatedForm>
          <div className="w-[45%] hidden md:flex items-center justify-center">
            <img src={authImg} alt="image" className="w-[85%]" />
          </div>
        </main>
      )}
    </>
  );
}
