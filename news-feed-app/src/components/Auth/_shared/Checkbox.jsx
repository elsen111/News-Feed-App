import React, { useEffect, useRef, useState } from "react";

export default function Checkbox({
  label,
  disabled = false,
  indeterminate = false,
}) {
  const [checked, setChecked] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate && !checked;
    }
  }, [checked, indeterminate]);

  return (
    <label
      className={`inline-flex items-center gap-2 select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={() => setChecked(prev => !prev)}
        className="sr-only peer"
      />

      <span
        className={`
          relative flex items-center justify-center
          w-5 h-5 border-2 rounded-sm
          transition-all duration-200
          peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400
          ${
            checked || (indeterminate && !checked)
              ? "bg-blue-600 border-blue-600"
              : "bg-white border-gray-400"
          }
        `}
      >
        {checked && !indeterminate && (
          <span className="absolute w-2.5 h-1.5 border-l-2 border-b-2 border-white -rotate-45" />
        )}

        {indeterminate && !checked && (
          <span className="absolute w-3 h-0.5 bg-white rounded" />
        )}
      </span>

      {label && <span className="text-sm text-(--form)">{label}</span>}
    </label>
  );
}
