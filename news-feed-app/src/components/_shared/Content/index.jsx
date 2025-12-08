import Title from "./Title";

const Content = ({children}) => {
  return (
    <section className="relative mx-auto flex flex-col gap-[30px] py-[50px] justify-center md:gap-[50px] md:py-20 w-[95%] min-w-auto xl:w-[93%] xl:min-w-[1140px]">
        <Title />
        {children}
    </section>
  )
}

export default Content