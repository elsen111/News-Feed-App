import React, { useEffect, useRef, useState } from "react";

export default function InputContainer({ children, label }) {
  const [labelActive, setLabelActive] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current.contains(e.target)) {
        setLabelActive(true);
      } else {
        setLabelActive(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [labelActive]);

  return (
    <div
      ref={containerRef}
      className="relative w-full text-[16px] transition-all duration-300"
    >
      <label
        htmlFor="email"
        className={`
         ${labelActive ? "text-[#62aacb]" : "text-primary-1"}
          absolute -top-3 left-[17px] bg-primary-2 text-[14px] px-2 transition-all duration-300 capitalize
        `}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
