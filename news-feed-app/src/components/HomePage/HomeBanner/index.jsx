import Carousel from "./Carousel"

export default function HomeBanner() {
  return (
    <section className="py-2 bg-linear-to-br from-[#0f7fbf] via-[#7b4ce0] to-[#ecc0d4] px-0 w-full flex justify-center items-center sm:py-4 h-[360px] sm:h-[480px] md:h-[615px]">
        <Carousel />
    </section>
  )
}
