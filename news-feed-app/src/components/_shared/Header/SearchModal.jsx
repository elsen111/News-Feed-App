import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSearch } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

import { setSearchQuery, fetchSearchedNews } from "../../../redux/features/searchQuerySlice";
import { addParams } from "../../../redux/features/suggestionSlices";

const Delete = ({ handleResetText }) => {
  return (
      <TiDelete
        onClick={handleResetText}
        className="text-[45px] h-full sm:text-[30px] opacity-50 transition-all duration-300 hover:opacity-100 cursor-pointer text-[#444]"
       />
  );
};


export default function SearchModal({ modalState }) {
  const [searchItem, setSearchItem] = useState("");
  const inpRef = useRef();
  const dispatch = useDispatch();

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

  const handleSubmitSearch = () => {
    const suggestionParam = (searchItem.includes(" ")) ? `&q=${searchItem.replace(" ", "%20")}` :`&q=${searchItem}`;
    console.log(searchItem);
    if(!searchItem.trim()) return;

    dispatch(setSearchQuery(searchItem));
    dispatch(fetchSearchedNews())
    dispatch(addParams(suggestionParam));    
  }

  const handleKeyPress = (e) => {
    if(e.key === "Enter") {
      handleSubmitSearch();
    }
  }

  return (
    <div
      className={`${modalState ? "opacity-100 h-[65px] sm:h-[70px]" : "opacity-0 h-0!"}
      absolute top-full flex items-center justify-center w-screen h-[65px] sm:h-[70px] left-0 bg-search-modal transition-all duration-500`}
    >
      <div className="flex items-center w-[95%] sm:w-[50%] rounded-3xl border-[3px] border-transparent bg-[#ffffff] gap-1 px-4 transition-all duration-500 focus-within:border-[3px] focus-within:border-cyan-600">
        <input
          onChange={handleChange}
          onKeyUp={handleKeyPress}
          ref={inpRef}
          name="query"
          value={searchItem}
          placeholder="Seach news..."
          type="text"
          className="w-full h-[80%] text-[#444] placeholder:italic text-[18px]"
        />

        {searchItem && <Delete handleResetText={handleResetText} />}

        <div className="pl-2 border-l border-l-gray-700/30">
          <IoMdSearch onClick={handleSubmitSearch} className="text-[35px] transition-all duration-300 hover:scale-115 cursor-pointer text-[#444]" />
        </div>
      </div>
    </div>
  );
}
