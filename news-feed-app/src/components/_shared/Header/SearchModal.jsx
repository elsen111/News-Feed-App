import { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

// Reset Button Component
const Delete = ({ handleResetText }) => {
  return (
      <TiDelete
        onClick={handleResetText}
        className="text-[45px] h-full sm:text-[30px] opacity-50 transition-all duration-300 hover:opacity-100 cursor-pointer text-[#444]"
       />
  );
};

// SearchModal Component
export default function SearchModal({ modalState }) {
  const [searchItem, setSearchItem] = useState("");
  const inpRef = useRef();

  useEffect(() => {
    modalState && inpRef.current.focus()
    !modalState && setSearchItem("")
  }, [modalState])

  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };

  const handleResetText = (e) => {
    e.stopPropagation()
    setSearchItem("");
    inpRef.current.focus();
  };

  return (
    <div
      className={`${modalState ? "opacity-100" : "opacity-0"}
      absolute top-full flex items-center justify-center w-screen h-[65px] sm:h-[70px] left-0 bg-search-modal transition-all duration-300`}
    >
      <div className="flex items-center w-[95%] sm:w-[50%] rounded-3xl border-[3px] border-transparent bg-[#ffffff] gap-1 px-4 transition-all duration-500 focus-within:border-[3px] focus-within:border-cyan-600">
        <input
          onChange={handleChange}
          ref={inpRef}
          name="query"
          value={searchItem}
          placeholder="Seach news..."
          type="text"
          className="w-full h-[80%] text-[#444] placeholder:italic text-[18px]"
        />

        {searchItem && <Delete handleResetText={handleResetText} />}

        <div className="pl-2 border-l border-l-gray-700/30">
          <IoMdSearch className="text-[35px] transition-all duration-300 hover:scale-115 cursor-pointer text-[#444]" />
        </div>
      </div>
    </div>
  );
}
