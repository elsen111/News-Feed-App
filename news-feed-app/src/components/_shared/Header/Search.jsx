import { IoSearchCircle } from "react-icons/io5";
import SearchModal from "./SearchModal";
import { useState } from "react";

export default function Search() {
    const [modalState, setModalState] = useState(false);

  return (
    <div>
        <IoSearchCircle
            className="text-[45px] cursor-pointer text-search-icon transition-all duration-300 hover:scale-125"
            onClick={() => setModalState(prevState => !prevState)}
        />

        <SearchModal modalState={modalState} />
    </div>
  )
}
