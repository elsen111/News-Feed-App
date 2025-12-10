import { Outlet, useLocation } from "react-router-dom";
import { DotLoader } from "react-spinners";
import Header from "../components/_shared/Header";
import ThemeProvider from "../context/ThemeContext";
import Footer from "../components/_shared/Footer";
import ToUpButton from "../components/_shared/ToUpButton";
import { useEffect, useState } from "react";

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const {pathname} = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <ThemeProvider>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center bg-blue-50">
          <DotLoader size={60} color="#147e85" />
        </div>
      ) : (
        <>
          <Header />
          <main className="relative top-[60px] sm:top-[70px] md:top-[90px]">
            <Outlet />
          </main>
          <ToUpButton />
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
}
