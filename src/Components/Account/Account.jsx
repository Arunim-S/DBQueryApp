import React from "react";
import Sidebar from "../Sidebar/Sidebar";
const Account = ({ user, logout }) => {
  console.log(user);
  return (
    <div className="bg-black flex w-full h-screen">
      <div className="w-1/5">
        <Sidebar user={user}></Sidebar>
      </div>
      <div className="flex flex-col p-8 gap-8 w-1/2 mx-auto">
        <h1 className="text-white text-[3rem] text-center pb-[3rem]">Account Details</h1>
        <div className="flex flex-col gap-[3rem]">
          <svg
            width="16rem"
            height="10rem"
            viewBox="0 0 24 24"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            className="mx-auto"
          >
            <defs></defs>
            <circle class="cls-1" cx="12" cy="7.25" r="5.73" />
            <path
              class="cls-1"
              d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"
            />
          </svg>
          <div className="w-full flex justify-between">
            <p className="text-white text-[1.3rem]">Name</p>
            <p className="text-white text-[1.3rem]">{user?.name}</p>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-white text-[1.3rem]">E-Mail</p>
            <p className="text-white text-[1.3rem]">{user.username}</p>
          </div>
          <div className="mx-auto gap-8 flex">
          <button className="text-white w-32 mx-auto bg-red-500 rounded-xl px-8 py-2" onClick={(e)=>{logout()}}>Logout</button>
          <button className="text-white mx-auto bg-red-500 rounded-xl px-8 py-2">Deactivate Account</button>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Account;
