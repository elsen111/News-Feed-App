import Carousel from "./Carousel"

export default function HomeBanner() {
  return (
    <section className="pb-2.5 bg-gray-500 px-0.5 w-full flex justify-center items-center h-[360px] sm:h-[480px] md:h-[615px]">
        <Carousel />
    </section>
  )
}
