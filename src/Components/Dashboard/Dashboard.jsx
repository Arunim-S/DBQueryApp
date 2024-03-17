import React, { useState, useEffect } from "react";
import "../../App.css";
import Login from "../Login_Page/Login";

const Dashboard = ({ pca, scopes }) => {
  const cardData = [
    { id: 1, title: "Containers", content: "Content of Card 1" },
    { id: 2, title: "Connectors", content: "Content of Card 2" },
    { id: 3, title: "Query Assistance", content: "Content of Card 3" },
    { id: 4, title: "Account", content: "Content of Card 4" },
  ];

  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const handleRedirectPromise = async () => {
  //     try {
  //       const result = await pca.handleRedirectPromise();
  //       if (result && result.account) {
  //         setUser(result.account);
  //         localStorage.setItem("userAccount", JSON.stringify(result.account));
  //       }
  //       setIsLoadingScreen(false);
  //     } catch (error) {
  //       // console.error('Error handling redirect promise:', error);
  //     }
  //   };

  //   const cachedUserAccount = localStorage.getItem("userAccount");
  //   // console.log(cachedUserAccount)
  //   if (cachedUserAccount) {
  //     setUser(JSON.parse(cachedUserAccount));
  //     setIsLoadingScreen(false);
  //   } else {
  //     handleRedirectPromise();
  //   }
  // }, []);
  const login = async () => {
    await pca.initialize();
    setIsLoadingScreen(true); // Set loading screen to true before attempting login
    try {
      await pca.loginPopup({ scopes });
      const updatedAccounts = pca.getAllAccounts();
      setUser(updatedAccounts[0]);
      localStorage.setItem("userAccount", JSON.stringify(updatedAccounts[0]));
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setIsLoadingScreen(false);
    }
  };

  // logout function
  const logout = () => {
    try {
      setIsLoadingScreen(true); // Set loading screen to true before attempting logout
      pca.logout();
      setUser(null);
      localStorage.removeItem("userAccount");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoadingScreen(false); // Set loading screen to false after logout process
    }
  };

  console.log(user);

  return user ? (
    <div className="flex w-full h-screen">
      <div className="w-full bg-black py-12">
        {/* search input */}
        {/* <div className="w-full flex items-center justify-center">
          <div className="flex w-2/3 rounded-full px-6 items-center bg-gradient-to-br from-blue-500 to-indigo-800">
          <input className="search1 bg-transparent w-full text-white p-3 focus:outline-none"></input>
          <button>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#fff"
          height="24px"
          width="24px"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 495.003 495.003"
          xml:space="preserve"
          >
          <g id="XMLID_51_">
          <path
          id="XMLID_53_"
          d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616   l-67.6-32.22V456.687z"
          />
          <path
          id="XMLID_52_"
          d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422   c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414   l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956   L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"
          />
          </g>
          </svg>
          </button>
          </div>
        </div> */}
        {/* mid content */}
        <div className="flex justify-end items-end px-8">
          <p className="text-white text-right px-12">{user?.name}</p>
          <button
            className="bg-[#005AC9] hover:bg-opacity-70 text-white font-semibold p-2 rounded-[2rem] text-xs w-32"
            onClick={(e) => {
              logout();
            }}
          >
            Log out
          </button>
        </div>
        <div className="w-full h-full flex-col items-center flex gap-[6rem] justify-center">
          <h1 className="text-white text-center text-[2rem] font-bold">
            Workspace
          </h1>
          <div className="grid grid-cols-2 gap-4 w-1/3 h-1/2">
            {cardData.map((card) => (
              <div
                key={card.id}
                className=" bg-[#005AC9] text-white rounded-[1.5rem] shadow-md p-6"
              >
                <h2 className="text-xl font-bold">{card.title}</h2>
                <p>{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Login login={login} logout={logout} username={user?.name}></Login>
  );
};

export default Dashboard;
