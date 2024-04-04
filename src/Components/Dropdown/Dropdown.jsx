import React, { useState } from "react";

const Dropdown = ({ options, setSelector, type }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSelector(option);
  };

  return (
    <div className="dropdown outline-none">
      <select
        className="w-[10rem] p-2 bg-gray-600 text-white rounded-xl outline-none"
        value={selectedOption}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="" className=""> Select {type}</option>
        {options.map((option, index) => (
          <option key={index} value={option} className="">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
