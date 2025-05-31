
import React from "react";

const FilterSection = ({ title, options, selectedOption, onChange }) => {
  return (
    <div className="flex flex-col gap-5 border border-gray-200 px-6 py-6 rounded-2xl bg-white transition">
      <h2 className="text-lg font-semibold text-gray-800 tracking-wide border-b border-gray-100 pb-2 uppercase select-none">
        {title}
      </h2>

      <div className="flex flex-col gap-4">
        {options.map((option, index) => {
          const inputId = `${title}-${option}`.replace(/\s+/g, "-").toLowerCase();

          return (
            <div className="flex items-center gap-3" key={index}>
              <input
                type="radio"
                id={inputId}
                name={title}
                checked={selectedOption === option}
                onChange={() => onChange(option)}
                className="accent-indigo-600 w-5 h-5 rounded border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
              />
              <label
                htmlFor={inputId}
                className="text-sm text-gray-700 hover:text-indigo-600 transition cursor-pointer select-none"
              >
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;
