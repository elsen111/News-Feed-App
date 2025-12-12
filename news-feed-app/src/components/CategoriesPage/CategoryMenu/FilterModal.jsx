import { useRef, useEffect, useState } from "react";
import DropDown from "./DropDown";
import Input from "./Input";
import { countries } from "../../../api/countries";
import { languages } from "../../../api/languages";

export default function FilterModal({ modalOpen, handleCloseModal }) {
  const defaultFilterOptions = {
    category: "all categories",
    time: "all time",
    sort: "sort by date",
    country: null,
    language: null,
  };
  const [activeControl, setActiveControl] = useState(null);
  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);

  const categoryFilterList = [
    {
      categoryOptions: ["All Categories"],
    },

    {
      categoryHeader: "Politics & World",
      categoryOptions: ["politics", "world", "crime", "domestic"],
    },

    {
      categoryHeader: "Business & Economy",
      categoryOptions: ["business", "top"],
    },

    {
      categoryHeader: "Science & Technology",
      categoryOptions: ["science", "technology"],
    },

    {
      categoryHeader: "Lifestyle & Culture",
      categoryOptions: ["lifestyle", "entertainment", "food", "tourism"],
    },

    {
      categoryHeader: "Health & Education",
      categoryOptions: ["health", "education"],
    },

    {
      categoryHeader: "Sports",
      categoryOptions: ["sports"],
    },

    {
      categoryHeader: "Other",
      categoryOptions: ["other"],
    },
  ];
  const timeFilterList = [
    "all time",
    "last hour",
    "last day",
    "last week",
    "last month",
    "last year",
  ];
  const sortFilterList = ["sort by date (default)", "sort by source priority"];

  const modalRef = useRef();

  useEffect(() => {
    const handlePosition = () => {
      if (window.innerWidth > 640) {
        if (window.scrollY > 20) {
          modalRef.current.style.top = "129px";
        } else {
          modalRef.current.style.top = "139px";
        }
      }
    };

    window.addEventListener("scroll", handlePosition);

    return () => window.removeEventListener("scroll", handlePosition);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleCloseModal();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) {
      setActiveControl(null);
    }
  }, [modalOpen]);

  const handleClose = () => {
    setActiveControl(null);
  };

  const handleOpen = (filterType) => {
    setActiveControl(filterType);
  };

  const handleSelect = (filterType, selectedValue) => {
    if (selectedValue) {
      setFilterOptions((prev) => ({ ...prev, [filterType]: selectedValue }));
    }

    setActiveControl(null);
  };

  const handleSubmitFilter = () => {
    console.log(filterOptions);
  };

  return (
    <aside
      ref={modalRef}
      className={`${
        modalOpen ? "translate-x-0" : "-translate-x-140"
      } bg-[#3A9E97] fixed w-full sm:w-[70%] md:w-[50%] lg:w-[32%] 
      h-fit top-[108px] sm:top-[119px] md:top-[139px] p-5 left-0 transition-all rounded-r-[7px] duration-500 flex flex-col gap-7`}
    >
      <DropDown
        onClose={handleClose}
        onOpen={handleOpen}
        onSelect={handleSelect}
        optionList={categoryFilterList}
        submitOption={() => setFilterOptions}
        filterType="category"
        isOpen={activeControl === "category"}
      />
      <DropDown
        onClose={handleClose}
        onOpen={handleOpen}
        onSelect={handleSelect}
        optionList={timeFilterList}
        filterType="time"
        isOpen={activeControl === "time"}
      />
      <DropDown
        onClose={handleClose}
        onOpen={handleOpen}
        onSelect={handleSelect}
        optionList={sortFilterList}
        filterType="sort"
        isOpen={activeControl === "sort"}
      />
      <Input
        onClose={handleClose}
        onOpen={handleOpen}
        onSelect={handleSelect}
        filterType="country"
        optionList={countries}
        isOpen={activeControl === "country"}
      />
      <Input
        filterType="language"
        onClose={handleClose}
        onOpen={handleOpen}
        onSelect={handleSelect}
        optionList={languages}
        isOpen={activeControl === "language"}
      />
      <button
        onClick={handleSubmitFilter}
        className="w-full text-white bg-blue-950 px-[15px] py-1 cursor-pointer rounded-md text-[16px] transition-all duration-300 hover:opacity-70 active:scale-95"
      >
        Search
      </button>
    </aside>
  );
}
