import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineFilterList } from "react-icons/md";
import { MdOutlineFilterListOff } from "react-icons/md";
import FilterModal from "./FilterModal";

import { setCategoriesParam, fetchSelectedCategories } from "../../../redux/features/categoryMenuSlices";
import { addParams } from "../../../redux/features/suggestionSlices";

export default function CategoryMenu() {
  const [modalOpen, setModalOpen] = useState(false);
  const menuRef = useRef();
  const dispatch = useDispatch();

  const categories = [
    {
      title: "politics & world",
      code: "politics,world,crime,domestic",
    },

    {
      title: "business & economy",
      code: "business,top",
    },

    {
      title: "science & technology",
      code: "science,technology",
    },

    {
      title: "lifestyle & culture",
      code: "lifestyle,entertainment,food,tourism",
    },
    {
      title: "health & education",
      code: "health,education",
    },
  ];

  const filterIconClasses =
    "cursor-pointer text-(--color-filter-icon) transition-all duration-300 hover:scale-125 text-[32px] md:text-[35px] flex-none";

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleSelectMenuItem = (e) => {
    const selectedItem = e.target.textContent.toLowerCase();
    const selectedCategories = categories.find(category => category.title === selectedItem);
    const param = `&category=${selectedCategories.code}`;
    
    dispatch(setCategoriesParam(param));
    dispatch(fetchSelectedCategories());
    dispatch(addParams(param));
  }

  useEffect(() => {
    const handlePosition = () => {
      if (window.innerWidth > 640) {
        if (window.scrollY > 20) {
          menuRef.current.style.top = "80px";
        } else {
          menuRef.current.style.top = "90px";
        }
      }
    };

    window.addEventListener("scroll", handlePosition);

    return () => window.removeEventListener("scroll", handlePosition);
  }, []);

  return (
    <nav
      ref={menuRef}
      className="sticky transition-all px-7 overflow-hidden duration-300 top-[60px] sm:top-[70px] md:top-[90px] w-full py-2 border-b border-(--border) mb-3 z-1 shadow-2xl bg-(--category-menu)"
    >
      <div className="gap-10 flex justify-around items-center w-full h-full scroll-hidden overflow-auto lg:overflow-hidden">
        {modalOpen ? (
          <MdOutlineFilterListOff
            className={filterIconClasses}
            onClick={handleCloseModal}
          />
        ) : (
          <MdOutlineFilterList
            className={filterIconClasses}
            onClick={handleOpenModal}
          />
        )}

        {categories.map((category) => {
          return (
            <button
              onClick={handleSelectMenuItem}
              key={category.title[0]}
              className="text-[16px] flex-none transition-all duration-300 text-(--text-primary) py-1 px-2 rounded-[5px] cursor-pointer capitalize hover:scale-110 hover:opacity-90"
            >
              {category.title}
            </button>
          );
        })}
      </div>

      <FilterModal modalOpen={modalOpen} handleCloseModal={handleCloseModal} />
    </nav>
  );
}
