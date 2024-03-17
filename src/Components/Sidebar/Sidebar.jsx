import React, { useState } from "react";

const Sidebar = () => {
  const [openCount, setOpenCount] = useState(0);
  const [container, setContainer] = useState(0);
  const [feature, setFeature] = useState(0);

  const handleClick = () => {
    setOpenCount(openCount + 1);
  };
  const handleContainer = (index) => {
    setContainer(index);
  };
  const handleFeature = (index) => {
    setFeature(index);
  };
  // console.log(openCount)
  const containersList = [
    {
      name: "Users",
    },
    {
      name: "Sales",
    },
    {
      name: "Products",
    },
    {
      name: "Departments",
    },
  ];
  const featuresList = [
    {
      name: "Workspace",
    },
    {
      name: "Query Assistance",
    },
    {
      name: "Connectors",
    },
    {
      name: "Account",
    },
  ];
  return (
    <div className="w-full relative bg-[#201E1E] h-screen flex flex-col text-white px-10">
      {/* heading */}
      <h1 className="text-white font-semibold text-left text-3xl pt-12">
        DB Query App
      </h1>
      {/* features list */}
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-col gap-4">
          <h1 className="mt-12 text-xl text-[#5D80C2] font-bold">Features</h1>
          {featuresList.map((c, index) => (
            <button
              onClick={(e) => {
                handleFeature(index);
              }}
              key={index}
              className={`${
                feature === index
                  ? "text-[#252222] rounded-xl p-2 transition-all ease-in-out text-left text-md font-semibold bg-white "
                  : "text-[#B0B0B0] rounded-xl p-2 transition-all ease-in-out text-left text-md font-semibold bg-transparent"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
      {/* acc
      {/* Containers list */}
      <div className="flex flex-col w-full h-[60%]">
        <div className="w-full flex flex-col gap-4">
          <h1 className="mt-12 text-xl text-[#5D80C2] font-bold">
            Your Containers
          </h1>
          {containersList.map((c, index) => (
            <button
              onClick={(e) => {
                handleContainer(index);
              }}
              key={index}
              className={`${
                container === index
                  ? "text-[#252222] rounded-xl p-2 transition-all ease-in-out text-left text-md font-semibold bg-white "
                  : "text-[#B0B0B0] rounded-xl p-2 transition-all ease-in-out text-left text-md font-semibold bg-transparent"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
      {/* account name */}
      <div className="absolute bottom-12 w-4/5 items-center px-2 flex h-12 border-2 rounded-3xl border-[#B0B0B0] gap-2">
        <img
          src="https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg"
          className="w-8 h-8 rounded-full"
        ></img>
        <p className="text-[#B0B0B0] text-xl">Arunim Singhal</p>
      </div>
    </div>
  );
};

export default Sidebar;
