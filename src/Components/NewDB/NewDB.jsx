import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./NewDB.css";

const NewDB = () => {
    const var_data = [
        {
            name: "Var1"
        },
        {
            name: "Var2"
        },
        {
            name: "Var3"
        },
        {
            name: "Var4"
        }
    ]
  return (
    <div className="w-full flex h-screen">
      <div className="w-1/5">
        <Sidebar></Sidebar>
      </div>
      <div className="w-4/5 bg-black py-12 flex gap-8 flex-col">
        <h1 className="text-white text-[2.5rem] mx-auto">
          Create or Upload New Database
        </h1>
        <div className="flex flex-col w-2/3 mx-auto h-full gap-8">
          <label className="text-white w-full flex gap-2 mx-auto flex-col">
            Name
            <input
              type="text"
              id="container-name"
              className="rounded-[1rem] text-black h-10 p-3 focus:outline-none"
              placeholder="Name of your container"
              required
            />
          </label>
          <div className="flex gap-4 items-center justify-center">
            <p className="text-white">No SQL</p>
            <label className="switch text-white gap-2 flex-col">
              <input type="checkbox" id="typeofdb" />
              <span class="slider round"></span>
            </label>
            <p className="text-white">SQL</p>
          </div>
          <div className="w-full mx-auto flex h-full rounded-[2rem] bg-[#0C2C54]">
            <div className="flex flex-col px-12 w-1/3 gap-4">   
            <p className="text-white font-semibold mx-auto pt-8">Define Your Schema</p>
                <label className="text-white w-full flex gap-2 mx-auto flex-col">
                Name
                <input
                type="text"
                id="container-name"
                className="rounded-[1rem] h-10 p-3 text-black focus:outline-none"
                placeholder="Variable"
                required
                />
                </label>
                <label className="text-white w-full flex gap-2 mx-auto flex-col">
                Name
                <input
                type="text"
                id="container-name"
                className="rounded-[1rem] h-10 p-3 text-black focus:outline-none"
                placeholder="Variable"
                required
                />
                </label>
                <label className="text-white w-full flex gap-2 mx-auto flex-col">
                Name
                <input
                type="text"
                id="container-name"
                className="rounded-[1rem] h-10 p-3 text-black focus:outline-none"
                placeholder="Variable"
                required
                />
                </label>
                <label className="text-white w-full flex gap-2 mx-auto flex-col">
                Name
                <input
                type="text"
                id="container-name"
                className="rounded-[1rem] h-10 p-3 text-black focus:outline-none"
                placeholder="Variable"
                required
                />
                </label>
                <label className="text-white w-full flex gap-2 mx-auto flex-col">
                Name
                <input
                type="text"
                id="container-name"
                className="rounded-[1rem] h-10 p-3 text-black focus:outline-none"
                placeholder="Variable"
                required
                />
                </label>
                <button className="flex mx-auto p-4">
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
                </button>
            </div>
            <div className="flex w-2/3 bg-opacity-25 bg-black h-full">
                <p className="text-white my-auto mx-auto">Drag & Drop your data (.json or .csv)</p>
            </div>
          </div>
          <div className="w-full items-center h-12 gap-4 flex justify-end text-white">
                <button className="flex gap-3">Connect with a database
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
                </button> 
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewDB;
