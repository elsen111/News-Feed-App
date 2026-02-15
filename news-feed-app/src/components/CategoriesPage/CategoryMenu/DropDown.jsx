import { useEffect, useState, memo } from "react";
import { IoIosArrowDown } from "react-icons/io";

const DropDown = ({
  optionList,
  filterType,
  isOpen,
  onOpen,
  onClose,
  onSelect,
  onToggle,
  reset,
  setReset,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (e) => {
    e.stopPropagation();
    const value = e.target.textContent;
    // const storedValue = (value === "All Categories") ? null : value;
    setSelectedOption(value);
    onSelect(filterType, value);
    onClose();
  };

  const handleClick = (e) => {
    // e.stopPropagation();
    onToggle(filterType);
  };

  useEffect(() => {
    if (reset) {
      filterType === "category"
        ? setSelectedOption("all categories")
        : setSelectedOption(optionList[0]);
      setReset(false);
    }
  }, [reset]);

  return (
    <div className="bg-(--input) w-full px-[15px] relative py-1 transition-all duration-300 hover:bg-(--input)/80 hover:border-blue-100 rounded-md text-[16px]">
      <div
        className="w-full flex justify-between items-center group relative cursor-pointer text-(--text-primary)"
        onClick={handleClick}
      >
        {selectedOption ? (
          <span className="capitalize">{selectedOption}</span>
        ) : (
          <span className="capitalize">
            {filterType === "category" ? "all categories" : `${optionList[0]}`}
          </span>
        )}
        <span
          className={`transition-all duration-500 group-hover:scale-120 ${
            isOpen && "rotate-180"
          } `}
        >
          <IoIosArrowDown size={21} />
        </span>
      </div>

      {isOpen && (
        <div
          className={`absolute max-h-[200px] overflow-y-auto w-full rounded-b-md top-8 left-0 right-5 z-10 bg-(--input) custom-scroll`}
        >
          <ul className="bg-(--input) text-(--text-primary)">
            {filterType === "category" ? (
              optionList.map((category) => {
                return !category.categoryHeader ? (
                  <li
                    key={category.categoryOptions[0]}
                    onClick={handleSelectOption}
                    className="transition-all duration-300 px-[15px] py-1 capitalize cursor-pointer"
                  >
                    {category.categoryOptions}
                  </li>
                ) : (
                  <li key={category.categoryOptions[0]}>
                    <p className="bg-(input)/70 px-[15px] py-1 font-bold pointer-events-none!">
                      {category.categoryHeader}
                    </p>
                    <ul>
                      {category.categoryOptions.map((option) => (
                        <li
                          key={option}
                          onClick={handleSelectOption}
                          className="transition-all duration-300 py-1 px-[15px] capitalize cursor-pointer text-(--text-primary) hover:bg-gray-400"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })
            ) : (
              <>
                {optionList.map((option) => (
                  <li
                    key={option}
                    onClick={handleSelectOption}
                    className="transition-all duration-300 py-1 px-[15px] capitalize cursor-pointer hover:bg-gray-200"
                  >
                    {option}
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(DropDown);
