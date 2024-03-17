import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

const Chatbot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex w-full h-screen bg-black">
      <div className={`w-1/5 ${sidebarOpen ? 'block' : 'hidden'}`}>
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
        <div className="w-3/5 mx-auto h-max">
          <input
            type="text"
            id="search-container"
            className="form-input bg-gradient-to-br from-blue-500 to-indigo-800 mt-1 block w-full outline-none rounded-[1rem] p-3 text-white transition-all ease-in-out"
            placeholder="Search"
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Chatbot;
