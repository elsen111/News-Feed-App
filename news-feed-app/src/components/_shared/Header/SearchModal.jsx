import { IoMdSearch } from "react-icons/io";

export default function SearchModal({modalState}) {
  return (
    <div className={
      `${modalState ? "opacity-100" : "opacity-0"}
      absolute top-full flex items-center justify-center w-screen h-[65px] sm:h-[70px] left-0 bg-search-modal transition-all duration-300`
      }>
      <div className="flex items-center w-[95%] sm:w-[50%] rounded-3xl border-[3px] border-transparent bg-[#ffffff] gap-1 px-4 transition-all duration-500 focus-within:border-[3px] focus-within:border-cyan-600">
        <input
          name="query"
          placeholder="Seach news..."
          type="text"
          className="w-full h-[80%] text-[#444] placeholder:italic text-[18px]"
        />
        <IoMdSearch className="text-[35px] transition-all duration-300 hover:scale-115 cursor-pointer text-[#444]" />
      </div>
    </div>
  );
}
