import React from "react";

const Nav = ({ login }) => {
  return (
    <nav className="bg-[#363535] text-white py-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">Text2NoSQL</div>
        <ul className="flex gap-8 items-center justify-center">
          <li>
            <a href="#" className="hover:text-gray-300">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Blogs
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Docs
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
        <ul className="flex gap-8 items-center">
          <li>
            
              <button
                className="bg-[#005AC9] hover:bg-opacity-70 text-white font-semibold p-2 rounded-[2rem] text-xs w-32"
                onClick={(e) => {
                  login();
                }}
              >
                Sign Up
              </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
