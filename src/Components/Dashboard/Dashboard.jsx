import React, { useState, useEffect } from "react";
import "../../App.css";
import Login from "../Login_Page/Login";
import axios from 'axios';
import fetchContainers from "../../fetchContainers";
import fetchDatabase from "../../fetchDatabases";
import {ClipLoader} from "react-spinners"
const Dashboard = ({ instance, user, login, logout }) => {
  const [containers, setContainers] = useState([]);
  const [databases, setDatabases] = useState([]);
  const [selector, setSelector] = useState(0);
  const [name, setName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [deletedb, setDeleteDb] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchContainers(databases, selector, setContainers);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [databases, selector]);

  useEffect(() => {
    setLoading(true);
    fetchDatabase(setDatabases);
  }, []);
  const handleCreateDB = async () => {
    try {
      const response = await fetch('https://text2nosqlserver.azurewebsites.net/api/createdb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      });

      console.log("hi")
      const data = response.status;
      if (data == 200) {
        setResponseMessage("Created Database Successfully"); // Assuming the response contains a 'message' field
        setName("")
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error state
    }
  };

  const handleDeleteDB = async (id) => {
    try {
      const response = await fetch('https://text2nosqlserver.azurewebsites.net/api/deletedb', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      console.log("Database deleted successfully");
      const data = response.status;
      if (data == 200) {
        setResponseMessage("Database deleted successfully")
        setDeleteDb("")
        window.location.reload();
      }
      // Optionally, handle any response data here if needed
    } catch (error) {
      console.error('Error:', error);
      // Handle error state
    }
  };
  return (
    <>
      {user.name ?
      <>
          {loading && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <ClipLoader color="#fff" />
            </div>
          )}
      <div className="w-full h-full relative">
        <div className="flex w-full h-screen">
          <div className="flex  flex-col w-[18rem] pt-8 pl-4 bg-[#201E1E] h-full justify-between overflow-y-auto">
            <div>
              <div className="flex w-full justify-between">
            <h1 className="text-white text-xl font-bold mb-8 pl-2">Databases</h1>
            
            <p className="text-white pr-4">{databases.length}</p>
              </div>
            {databases?.map((e, index) => (
              <div key={index} className={`hover:bg-white hover:text-black  ${selector == index ? "bg-white text-black" : "text-white"}`}>
                <button className="text-left text-xl p-2 w-full" onClick={(e) => { setSelector(index) }}>{e}</button>
              </div>
            ))}
            </div>
            <div className="py-12">
              {/* create database */}
              {showCreate ?

                <div className="py-8 flex flex-col pr-4 gap-4">
                  <h1 className="text-white text-center">Create Database</h1>
                  <label className="text-white">Name</label>
                  <input type="text" value={name} className="p-2 outline-none rounded-xl" onChange={(e) => { setName(e.target.value) }}></input>
                  <button className="bg-blue-400 rounded-xl" onClick={(e) => handleCreateDB()}>Create</button>
                  <div className="text-white">{responseMessage ? responseMessage : ""}</div>
                </div> : ""
              }
              {/* delete database */}
              {showDelete ? <div className="py-8 flex flex-col pr-4 gap-4">
                <h1 className="text-white text-center">Delete Database</h1>
                <label className="text-white">Name</label>
                <input type="text" value={deletedb} className="p-2 outline-none rounded-xl" onChange={(e) => { setDeleteDb(e.target.value) }}></input>
                <button className="bg-red-400 rounded-xl" onClick={(e) => handleDeleteDB(deletedb)}>Delete</button>
                <div className="text-white">{responseMessage ? responseMessage : ""}</div>
              </div> : ""}
              <button className="text-white py-4 font-bold" onClick={(e)=>{setShowCreate(!showCreate)}}>Create Database</button>
              <button className="text-white py-4 font-bold" onClick={(e)=>{setShowDelete(!showDelete)}}>Delete Database</button>
            </div>
          </div>
          <div className="w-full bg-black py-12">
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
            <div className="flex h-full">
              <div className="w-full h-full flex-col items-center flex gap-[6rem] justify-center">
                <h1 className="text-white text-center text-[2rem] font-bold">
                  Workspace
                </h1>
                <div className="grid grid-cols-2 gap-8 w-3/4 h-full p-8">
                  <a className="" href=""><div className="w-full h-full hover:shadow-white bg-[#005AC9] text-white flex flex-col rounded-[1.5rem] shadow-lg p-6 hover:scale-110 transition-all ease-in-out delay-100">
                    <div className="flex w-full justify-between">
                    <h2 className="text-[2rem] font-bold">Containers</h2>
                    <p className="text-white text-xl">{containers.length}</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <table className="w-full border-collapse my-auto">
                        <tbody>
                          {containers?.map((e, index) => (
                            <tr key={index} className="">
                              <td className="text-left text-xl">{e}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div></a>

                  <a className="" href="/connector"><div className="w-full h-full bg-[#005AC9] hover:shadow-white text-white flex flex-col justify-between rounded-[1.5rem] shadow-lg p-6 hover:scale-110 transition-all ease-in-out delay-100">
                    <h2 className="text-[2rem] font-bold">Connectors</h2>
                    <svg
                      width="10rem"
                      height="8rem"
                      viewBox="0 0 32 32"
                      id="svg5"
                      version="1.1"
                      fill="#fff"
                    >
                      <defs id="defs2" />

                      <g id="layer1" transform="translate(-300,-388)">
                        <path
                          d="m 322,409.01367 a 1,1 0 0 0 -0.70703,0.29297 l -2,2 a 1.0001,1.0001 0 0 0 -0.0371,0.0469 1,1 0 0 0 -0.0684,0.0859 1.0001,1.0001 0 0 0 -0.0566,0.0898 1,1 0 0 0 -0.0508,0.10547 1.0001,1.0001 0 0 0 -0.0371,0.10351 1,1 0 0 0 -0.0234,0.10547 1.0001,1.0001 0 0 0 -0.0137,0.11914 1,1 0 0 0 -0.006,0.0508 1,1 0 0 0 0.006,0.0508 1.0001,1.0001 0 0 0 0.0137,0.11914 1,1 0 0 0 0.0234,0.10547 1.0001,1.0001 0 0 0 0.0371,0.10352 1,1 0 0 0 0.0508,0.10547 1.0001,1.0001 0 0 0 0.0566,0.0898 1,1 0 0 0 0.0684,0.0859 1.0001,1.0001 0 0 0 0.0371,0.0469 l 2,2 a 1,1 0 0 0 1.41406,0 1,1 0 0 0 0,-1.41406 l -0.29297,-0.29297 H 326 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 h -3.58594 l 0.29297,-0.29297 a 1,1 0 0 0 0,-1.41406 A 1,1 0 0 0 322,409.01367 Z"
                          id="path453593"
                        />

                        <path
                          d="m 312,389.01367 c -2.63824,0 -5.03895,0.59351 -6.85742,1.62305 C 303.32411,391.66626 302,393.22484 302,395.10938 v 17.80468 c 0,1.88494 1.32411,3.44611 3.14258,4.47656 1.81847,1.03047 4.219,1.62305 6.85742,1.62305 2.54606,0 4.86486,-0.55269 6.65625,-1.51953 1.19527,0.95008 2.70502,1.51953 4.34375,1.51953 3.85414,0 7,-3.14585 7,-7 0,-3.85413 -3.14586,-7 -7,-7 -0.33979,0 -0.67289,0.025 -1,0.0723 v -9.97656 c 0,-1.88454 -1.32411,-3.44312 -3.14258,-4.47266 -1.81847,-1.02954 -4.21918,-1.62305 -6.85742,-1.62305 z m 0,2 c 2.33231,0 4.43222,0.54865 5.87109,1.36328 1.43889,0.81464 2.12891,1.80226 2.12891,2.73243 0,0.93096 -0.69003,1.92118 -2.12891,2.73632 -1.43886,0.81515 -3.5389,1.36328 -5.87109,1.36328 -2.33219,0 -4.43223,-0.54813 -5.87109,-1.36328 C 304.69003,397.03056 304,396.04034 304,395.10938 c 0,-0.93017 0.69002,-1.91779 2.12891,-2.73243 1.43887,-0.81463 3.53878,-1.36328 5.87109,-1.36328 z m -8,7.79492 c 0.35022,0.28389 0.73259,0.54508 1.14258,0.77735 1.81848,1.0302 4.21906,1.62304 6.85742,1.62304 2.63836,0 5.03894,-0.59284 6.85742,-1.62304 0.40999,-0.23227 0.79236,-0.49346 1.14258,-0.77735 v 2.23633 c 0,0.93097 -0.69003,1.91923 -2.12891,2.73438 -1.43886,0.81514 -3.5389,1.36523 -5.87109,1.36523 -2.33219,0 -4.43223,-0.55009 -5.87109,-1.36523 C 304.69003,402.96415 304,401.97589 304,401.04492 Z m 0,5.9336 c 0.35022,0.28374 0.73259,0.54508 1.14258,0.77734 1.81848,1.0302 4.21906,1.625 6.85742,1.625 2.63836,0 5.03894,-0.5948 6.85742,-1.625 0.40999,-0.23226 0.79236,-0.4936 1.14258,-0.77734 v 0.94922 c -1.90408,0.90926 -3.33657,2.65526 -3.82031,4.75586 -1.21133,0.39534 -2.64498,0.63086 -4.17969,0.63085 -2.33226,0 -4.43224,-0.54836 -5.87109,-1.36328 C 304.69004,408.89992 304,407.91143 304,406.98047 Z m 19,2.27148 c 2.77327,0 5,2.22674 5,5 0,2.77327 -2.22673,5 -5,5 -2.77327,0 -5,-2.22673 -5,-5 0,-0.21391 0.0133,-0.42422 0.0391,-0.63086 a 0.99999499,0.99999499 0 0 0 0.0176,-0.13281 c 0.27125,-1.78885 1.48397,-3.25773 3.11914,-3.89453 a 0.99999499,0.99999499 0 0 0 0.28906,-0.10352 c 0.48298,-0.15418 0.99924,-0.23828 1.53516,-0.23828 z m -19,3.66406 c 0.35022,0.28373 0.73259,0.54514 1.14258,0.77735 1.81849,1.02993 4.21913,1.62305 6.85742,1.62304 1.43128,0 2.78941,-0.17768 4.02539,-0.50195 0.10036,1.24866 0.52985,2.40692 1.20313,3.38672 -1.39006,0.63466 -3.21756,1.05078 -5.22852,1.05078 -2.33213,0 -4.43222,-0.54791 -5.87109,-1.36328 C 304.69002,414.83503 304,413.84503 304,412.91406 Z"
                          id="path453547"
                        />
                      </g>
                    </svg>
                  </div></a>

                  <a className="" href="/chat"><div className="w-full h-full bg-[#005AC9] hover:shadow-white text-white flex flex-col justify-between rounded-[1.5rem] shadow-lg p-6 hover:scale-110 transition-all ease-in-out delay-100">
                    <h2 className="text-[2rem] font-bold">Query Assistance</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10rem"
                      height="8rem"
                      viewBox="0 0 24 24"
                      fill="#fff"
                    >
                      <path
                        d="M8 9H16"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8 12.5H13.5"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM1.25 10.5C1.25 10.9142 1.58579 11.25 2 11.25C2.41421 11.25 2.75 10.9142 2.75 10.5H1.25ZM3.07351 15.6264C2.915 15.2437 2.47627 15.062 2.09359 15.2205C1.71091 15.379 1.52918 15.8177 1.68769 16.2004L3.07351 15.6264ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM19.6125 2.7368L19.2206 3.37628L19.6125 2.7368ZM21.2632 4.38751L21.9027 3.99563V3.99563L21.2632 4.38751ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM13.5 2.75C15.1512 2.75 16.337 2.75079 17.2619 2.83873C18.1757 2.92561 18.7571 3.09223 19.2206 3.37628L20.0044 2.09732C19.2655 1.64457 18.4274 1.44279 17.4039 1.34547C16.3915 1.24921 15.1222 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.87781 22.7508 7.6085 22.6545 6.59611C22.5572 5.57256 22.3554 4.73445 21.9027 3.99563L20.6237 4.77938C20.9078 5.24291 21.0744 5.82434 21.1613 6.73809C21.2492 7.663 21.25 8.84876 21.25 10.5H22.75ZM19.2206 3.37628C19.7925 3.72672 20.2733 4.20752 20.6237 4.77938L21.9027 3.99563C21.4286 3.22194 20.7781 2.57144 20.0044 2.09732L19.2206 3.37628ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z"
                        fill="#fff"
                      />
                    </svg>
                  </div></a>

                  <a className="" href="/account"><div className="w-full h-full bg-[#005AC9] text-white flex flex-col justify-between rounded-[1.5rem] hover:hover:shadow-white shadow-lg p-6 hover:scale-110 transition-all ease-in-out delay-100">
                    <h2 className="text-[2rem] font-bold">Accounts</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#fff"
                      width="10rem"
                      height="8rem"
                      viewBox="0 0 24 24"
                    >
                      <title>Account Settings</title>
                      <path d="M9.6,3.32a3.86,3.86,0,1,0,3.86,3.85A3.85,3.85,0,0,0,9.6,3.32M16.35,11a.26.26,0,0,0-.25.21l-.18,1.27a4.63,4.63,0,0,0-.82.45l-1.2-.48a.3.3,0,0,0-.3.13l-1,1.66a.24.24,0,0,0,.06.31l1,.79a3.94,3.94,0,0,0,0,1l-1,.79a.23.23,0,0,0-.06.3l1,1.67c.06.13.19.13.3.13l1.2-.49a3.85,3.85,0,0,0,.82.46l.18,1.27a.24.24,0,0,0,.25.2h1.93a.24.24,0,0,0,.23-.2l.18-1.27a5,5,0,0,0,.81-.46l1.19.49c.12,0,.25,0,.32-.13l1-1.67a.23.23,0,0,0-.06-.3l-1-.79a4,4,0,0,0,0-.49,2.67,2.67,0,0,0,0-.48l1-.79a.25.25,0,0,0,.06-.31l-1-1.66c-.06-.13-.19-.13-.31-.13L19.5,13a4.07,4.07,0,0,0-.82-.45l-.18-1.27a.23.23,0,0,0-.22-.21H16.46M9.71,13C5.45,13,2,14.7,2,16.83v1.92h9.33a6.65,6.65,0,0,1,0-5.69A13.56,13.56,0,0,0,9.71,13m7.6,1.43a1.45,1.45,0,1,1,0,2.89,1.45,1.45,0,0,1,0-2.89Z" />
                    </svg>
                  </div></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
       : 
      (<Login instance={instance} login={login}></Login>)
    }
      </>
  )
};

export default Dashboard;
