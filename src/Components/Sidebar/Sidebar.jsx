import React, { useState } from "react";

const Sidebar = () => {
  const [openCount, setOpenCount] = useState(0);
  const [container, setContainer] = useState(0);
  const handleClick = () => {
    setOpenCount(openCount + 1);
  };
  const handleContainer = (index) => {
    setContainer(index);
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
  console.log(container);
  return (
    <div className="w-full relative bg-[#201E1E] h-screen flex flex-col text-white px-10">
      {/* heading */}
      <h1 className="text-white font-semibold text-center text-3xl py-12">
        DB Query App
      </h1>
      {/* new container and search */}
      <div className="flex w-full justify-center gap-4">
        <div className="w-4/5 flex">
          <button className="hover:to-indigo-700 hover:ease-in-out hover:transition-all w-full flex justify-center items-center gap-2 rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-800 h-10 mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 12H20M12 4V20"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>New Container</p>
          </button>
        </div>
        <div className="w-1/5 flex">
          <button
            className="w-10 items-center justify-center bg-white h-10 rounded-full flex mx-auto"
            onClick={(e) => handleClick()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000"
              width="16px"
              height="16px"
              viewBox="0 0 32 32"
              version="1.1"
            >
              <path d="M31.707 30.282l-9.717-9.776c1.811-2.169 2.902-4.96 2.902-8.007 0-6.904-5.596-12.5-12.5-12.5s-12.5 5.596-12.5 12.5 5.596 12.5 12.5 12.5c3.136 0 6.002-1.158 8.197-3.067l9.703 9.764c0.39 0.39 1.024 0.39 1.415 0s0.39-1.023 0-1.415zM12.393 23.016c-5.808 0-10.517-4.709-10.517-10.517s4.708-10.517 10.517-10.517c5.808 0 10.516 4.708 10.516 10.517s-4.709 10.517-10.517 10.517z" />
            </svg>
          </button>
        </div>
      </div>
      {/* search container */}
      {openCount % 2 == 0 && (
        <div className="mt-4">
          <input
            type="text"
            id="search-container"
            className="form-input mt-1 block w-full rounded-[1rem] p-3 text-black transition-all ease-in-out"
            placeholder="Search"
          />
        </div>
      )}
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
