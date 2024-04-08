import React, { useState } from "react";

const Dropdown = ({ options, setSelector, type, setContainers }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    console.log(option)
    setSelectedOption(option);
    setSelector(option);
    let cont = []
    options?.map((e) => {
      if (e.name == option) {
        e.containers.map((i) => {
          cont.push(i);
        })
      }
    })
    setContainers(cont);
  };
  console.log(selectedOption)
  const handleSelectC = (option) => {
    console.log(option)
    setSelectedOption(option);
    options?.map((e) => {
      if (e.name == option) {
        setSelector(e)
        setContainers(e.schema)
      }
    })
  };
  if (type == "Database") {
    return (
      <div className="dropdown outline-none">
        <select
          className="w-[10rem] p-2 bg-gray-600 text-white rounded-xl outline-none"
          value={selectedOption}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="" className=""> Select {type}</option>
          {options.map((option, index) => (
            <option key={index} value={option.name} className="">
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
  else {
    return (
      <div className="dropdown outline-none">
        <select
          className="w-[10rem] p-2 bg-gray-600 text-white rounded-xl outline-none"
          value={selectedOption}
          onChange={(e) => handleSelectC(e.target.value)}
        >
          <option value="" className=""> Select {type}</option>
          {options.map((option, index) => (
            <option key={index} value={option.name} className="">
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
};

export default Dropdown;
