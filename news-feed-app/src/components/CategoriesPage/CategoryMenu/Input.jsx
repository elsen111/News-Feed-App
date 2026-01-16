import { useEffect, useState } from "react";

export default function Input({ optionList, filterType, isOpen, onOpen, onClose, onSelect, reset, setReset }) {
  const [value, setValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    if(reset) setValue("");
    setReset(false);
  }, [reset])

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if(!newValue.trim()) {
        setFilteredOptions([]);
        onSelect(filterType, null);
        isOpen && onClose();
        return;
    }

    const matches = optionList.filter((option) => option.name.toUpperCase().includes(newValue.toUpperCase())
    )

    setFilteredOptions(matches);

    if(matches.length != 0 && !isOpen) {
        onOpen(filterType)
    } else if(matches.length === 0  &&  isOpen) {
        onClose();
    }
  };


  const handleSelectOption = (e) => {
    e.stopPropagation();
    const selectedValue = e.target.textContent;
    const valueCode = optionList.find(option => option.name.toUpperCase() === selectedValue.toUpperCase()).code; 
    setValue(selectedValue);
    setFilteredOptions([]);
    onSelect(filterType, valueCode);
    onClose();
  }

  const handleFocus = () => {
    if (filteredOptions.length != 0 && !isOpen) {
        onOpen(filterType)
    }
  }

  const showList = (isOpen  &&  filteredOptions.length != 0);

  const placeholder =
    filterType === "country" ? "Search by countries" : "Search by languages";

  return (
    <div className="bg-(--input) w-full px-[15px] relative py-1 transition-all duration-300 hover:bg-(--input)/80 rounded-md text-[16px]">
      <input
        value={value}
        type="text"
        className="w-full text-(--text-primary)"
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
      />

      {showList && (
        <div
          className={`absolute max-h-[200px] overflow-y-auto h-fit z-10 w-full rounded-b-md top-8 left-0 right-5 bg-(--input) custom-scroll`}
        >
          <ul className="bg-(--input)/70 max-h-[100px]">
            {filteredOptions.map((option) => {
              return (
                <li key={Math.random()} onClick={handleSelectOption} className="transition-all duration-300 py-1 px-[15px] capitalize w-fit cursor-pointer hover:translate-x-[5px] hover:opacity-70 text-(--text-primary)">
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
