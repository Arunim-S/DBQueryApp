import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for routing
import "../../App.css";

const Sidebar = ({ user }) => {
  const [openCount, setOpenCount] = useState(0);
  const [container, setContainer] = useState(0);
  const [feature, setFeature] = useState(null);

  useEffect(() => {
    // Get the current path
    const currentPath = window.location.pathname;

    // Find the index of the feature matching the current path
    const currentIndex = featuresList.findIndex((f) => f.route === currentPath);

    // Set the feature index to the currentIndex if found, otherwise keep it null
    setFeature(currentIndex !== -1 ? currentIndex : null);
  }, []); // Run this effect only once after initial render

  const handleClick = () => {
    setOpenCount(openCount + 1);
  };

  const handleContainer = (index) => {
    setContainer(index);
  };

  const handleFeature = (index) => {
    setFeature(index);
  };

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
      route: "/",
    },
    {
      name: "Query Assistance",
      route: "/chat",
    },
    {
      name: "Connectors",
      route: "/connector",
    },
    {
      name: "Account",
      route: "/account",
    },
  ];

  return (
    <div
      className={`w-full relative bg-[#201E1E] h-screen flex flex-col text-white px-10 ${openCount ? "sidebar-open" : "sidebar-closed"}`}
    >
      {/* heading */}
      <h1 className="text-white font-semibold text-left text-3xl pt-12">
        DB Query App
      </h1>
      {/* features list */}
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-col gap-4">
          <h1 className="mt-12 text-xl text-[#5D80C2] font-bold">Features</h1>
          {featuresList.map((c, index) => (
            <NavLink
              to={c.route}
              key={index}
              onClick={() => handleFeature(index)}
              className={`w-full ${
                feature === index
                  ? "text-[#252222] rounded-xl p-2 transition-all ease-in-out text-left text-md font-semibold bg-white "
                  : "text-[#B0B0B0] rounded-xl p-2 transition-all ease-in-out text-left text-md font-semibold bg-transparent"
              }`}
            >
              {c.name}
            </NavLink>
          ))}
        </div>
      </div>
      {/* Containers list */}
      <div className="flex flex-col w-full h-[60%]">
        <div className="w-full flex flex-col gap-4">
          <h1 className="mt-12 text-xl text-[#5D80C2] font-bold">
            Your Containers
          </h1>
          {containersList.map((c, index) => (
            <button
              onClick={() => handleContainer(index)}
              key={index}
              className={
                "text-[#B0B0B0] rounded-xl p-2 transition-all ease-in-out text-left text-md font-semibold bg-transparent"
              }
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
      {/* account name */}
      <div className="absolute bottom-12 w-4/5 items-center justify-center px-2 flex h-12 border-2 rounded-3xl border-[#B0B0B0] gap-2">
        <svg
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 24 24"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#fff"
          className=""
        >
          <defs></defs>
          <circle class="cls-1" cx="12" cy="7.25" r="5.73" />
          <path
            class="cls-1"
            d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"
          />
        </svg>
        <p className="text-[#B0B0B0] text-xl">{user?.name}</p>
      </div>
    </div>
  );
};

export default Sidebar;
