import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

const Chatbot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex w-full h-screen bg-black">
      <div className={`w-1/5 ${sidebarOpen ? "block" : "hidden"}`}>
        <Sidebar></Sidebar>
      </div>
      <div className={`flex flex-row ${!setSidebarOpen ? "w-4/5" : "w-full"}`}>
        <div className="items-center flex p-4">
          <button
            className="text-white text-center mt-4 focus:outline-none"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? "<" : ">"}
          </button>
        </div>
        <div className="w-full h-full flex flex-col justify-between py-12">
          <div className="">
            <h1 className="text-white text-center text-[3rem]">DB Query App</h1>
          </div>
          <div className="w-3/5 mx-auto h-max flex gap-2">
            <input
              type="text"
              id="search-container"
              className="form-input relative bg-gradient-to-br from-blue-500 to-indigo-800 mt-1 block w-full outline-none rounded-[1rem] p-3 text-white transition-all ease-in-out"
              placeholder="Search"
            />
            <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path
                d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
