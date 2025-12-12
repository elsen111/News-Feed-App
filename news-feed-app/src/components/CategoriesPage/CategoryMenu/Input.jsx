import { useState } from "react";

export default function Input({ optionList, filterType, isOpen, onToggle }) {
  const [value, setValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if(!newValue.trim()) {
        setFilteredOptions([]);
        isOpen && onToggle(null);
        return;
    }

    const matches = optionList.filter((option) => option.name.toUpperCase().includes(newValue.toUpperCase())
    )

    setFilteredOptions(matches);

    if(matches.length != 0 && !isOpen) {
        onToggle(filterType);
    } else if(matches.length === 0  &&  isOpen) {
        onToggle(null);
    }
  };


  const handleSelectOption = ( e) => {
    e.stopPropagation();
    const selectedValue = e.target.textContent;
    setValue(selectedValue);
    setFilteredOptions([]);
    onToggle(null);
  }

  const handleFocus = () => {
    if (filteredOptions.length != 0 && !isOpen) {
        onToggle(filterType);
    }
  }

  const showList = (isOpen  &&  filteredOptions.length != 0);

  const placeholder =
    filterType === "country" ? "Search by countries" : "Search by languages";

  return (
    <div className="bg-primary-2 w-full px-[15px] relative py-1 transition-all duration-300 hover:bg-emerald-50 hover:border-blue-100 border-2 border-primary-1 rounded-md text-[16px]">
      <input
        value={value}
        type="text"
        className="w-full"
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
      />

      {showList && (
        <div
          className={`absolute max-h-[200px] overflow-y-auto h-fit z-10 w-full rounded-b-md top-8 left-0 right-5 bg-primary-2 border-2 border-primary-1 custom-scroll`}
        >
          <ul className="bg-primary-2">
            {filteredOptions.map((option) => {
              return (
                <li onClick={handleSelectOption} className="transition-all duration-300 py-1 px-[15px] capitalize cursor-pointer hover:bg-gray-200">
                  {option.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
