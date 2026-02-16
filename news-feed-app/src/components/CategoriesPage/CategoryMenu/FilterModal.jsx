import { useRef, useEffect, useState, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterOptions,
  fetchFilteredNews,
  resetFilters,
} from "../../../redux/features/filterSlice";
import DropDown from "./DropDown";
import Input from "./Input";
import { countries } from "../../../api/services/countries";
import { languages } from "../../../api/services/languages";

const FilterModal = ({ modalOpen, handleCloseModal }) => {
  const dispatch = useDispatch();
  const filterOptions = useSelector((state) => state.filters);

  // const defaultFilterOptions = {
  //   category: "all categories",
  //   time: "all time",
  //   sort: "sort by date",
  //   country: null,
  //   language: null,
  // };

  const [activeControl, setActiveControl] = useState(null);
  const [reset, setReset] = useState(false);
  // const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);

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

  // const timeFilterList = [
  //   "all time",
  //   "last hour",
  //   "last day",
  //   "last week",
  //   "last month",
  //   "last year",
  // ];

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

  const handleClose = useCallback(() => {
    setActiveControl(null);
  }, []);

  const handleOpen = useCallback((filterType) => {
    setActiveControl(filterType);
  }, []);

  const handleToggle = useCallback((filterType) => {
    setActiveControl((prev) => (prev === filterType ? null : filterType));
  }, []);

  const handleSelect = useCallback(
    (filterType, selectedValue) => {
      dispatch(setFilterOptions({ filterType, value: selectedValue }));

      setActiveControl(null);
    },
    [dispatch],
  );

  const handleSubmitFilter = useCallback(() => {
    console.log(filterOptions);
    dispatch(fetchFilteredNews());
  }, [filterOptions, dispatch]);

  const handleResetFilter = useCallback(() => {
    dispatch(resetFilters());
    setReset(true);
  }, [dispatch]);

  return (
    <aside
      ref={modalRef}
      className={`${
        modalOpen ? "translate-x-0" : "-translate-x-140"
      } bg-(--filter-modal) fixed w-full sm:w-[70%] md:w-[50%] lg:w-[32%] 
      h-fit top-[108px] sm:top-[119px] md:top-[139px] p-5 left-0 transition-all rounded-r-[7px] duration-500 flex flex-col gap-7 overflow-hidden`}
    >
      <DropDown
        onClose={handleClose}
        onOpen={handleOpen}
        onSelect={handleSelect}
        onToggle={handleToggle}
        optionList={categoryFilterList}
        submitOption={() => setFilterOptions}
        filterType="category"
        isOpen={activeControl === "category"}
        reset={reset}
        setReset={setReset}
      />
      {/* <DropDown
        onClose={handleClose}
        onOpen={handleOpen}
        onSelect={handleSelect}
        onToggle={handleToggle}
        optionList={timeFilterList}
        filterType="time"
        isOpen={activeControl === "time"}
      /> */}
      <DropDown
        onClose={handleClose}
        onOpen={handleOpen}
        onSelect={handleSelect}
        onToggle={handleToggle}
        optionList={sortFilterList}
        filterType="sort"
        isOpen={activeControl === "sort"}
        reset={reset}
        setReset={setReset}
      />
      <Input
        onClose={handleClose}
        onOpen={handleOpen}
        onSelect={handleSelect}
        filterType="country"
        optionList={countries}
        isOpen={activeControl === "country"}
        reset={reset}
        setReset={setReset}
      />
      <Input
        filterType="language"
        onClose={handleClose}
        onOpen={handleOpen}
        onSelect={handleSelect}
        optionList={languages}
        isOpen={activeControl === "language"}
        reset={reset}
        setReset={setReset}
      />

      <button
        onClick={handleResetFilter}
        className="w-full text-[#111827] bg-[#F9FAFB] px-[15px] py-1 cursor-pointer rounded-md text-[16px] transition-all duration-300 hover:opacity-70 active:scale-95"
      >
        Reset filter
      </button>

      <button
        onClick={handleSubmitFilter}
        className="w-full text-white bg-(--filter-search) px-[15px] py-1 cursor-pointer rounded-md text-[16px] transition-all duration-300 hover:opacity-70 active:scale-95"
      >
        Search
      </button>
    </aside>
  );
};

export default memo(FilterModal);
