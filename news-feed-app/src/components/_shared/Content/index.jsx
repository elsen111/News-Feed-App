import Title from "./Title";
import { useLocation } from "react-router-dom";

const Content = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <section
      className={`relative mx-auto flex flex-col gap-5  justify-center md:gap-[50px] 
      ${pathname == "/" ? "py-[50px] md:py-20" : "py-2.5 md:py-8 mb-4 sm:mb-10"}
     w-[95%] min-w-auto xl:w-[93%] xl:min-w-[1140px]`}
    >
      <Title />
      {children}
    </section>
  );
};

export default Content;
