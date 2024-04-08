import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Step2 from "./Step2";
import NextIcon from "../../row1_1_.png";
import axios from "axios";

const Connector = ({ user, container }) => {
  const [endpoint, setEndpoint] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [databaseName, setDatabaseName] = useState(""); // New state for database name
  const [containerName, setContainerName] = useState(""); // New state for container name
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [step1Completed, setStep1Completed] = useState(false);
  const [showStep2, setShowStep2] = useState(false);
  const [schemaData, setSchemaData] = useState(null); // State to hold schema data

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleEndpointChange = (event) => {
    setEndpoint(event.target.value);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleDatabaseNameChange = (event) => {
    setDatabaseName(event.target.value);
  };

  const handleContainerNameChange = (event) => {
    setContainerName(event.target.value);
  };

  const handleStep1Submit = async () => {
    try {
      console.log("hi")
      if (endpoint && apiKey && databaseName && containerName) {
        const data = {
          cosmos_db_url: endpoint,
          cosmos_db_api_key: apiKey,
          database_name: databaseName,
          container_name: containerName
        };

        const response = await axios.post(
          'https://dbconnectionendpoint.azurewebsites.net/api/dbConnect?code=PAcpKKLG5dzJ22IngT9zwUZ2yaYICPCN75k0pK0MKlr0AzFu-4aNHQ==',
          data
        );

        console.log(response)
        const schemaData = response.data;
        console.log(schemaData)
        if (schemaData) {
          setSchemaData(schemaData);
          setStep1Completed(true);
          setShowStep2(true);
        }
      }
      else {
        console.log("Please fill all values")
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error, show error message, etc.
    }
  };

  const handleStep2ButtonClick = () => {
    setShowStep2(true);
  };
  const handleStep2Back = () => {
    setShowStep2(false);
  };

  return (
    <div className="flex flex-row w-full min-h-screen bg-black relative">
      {sidebarVisible ? (
        <div className="w-1/5">
          <Sidebar user={user} setSidebarOpen={setSidebarVisible} />
        </div>

      ) : (
        <div className="p-8">
          <button onClick={(e) => setSidebarVisible(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path
                d="M4 18L20 18"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 12L20 12"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 6L20 6"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}
      <div className={`flex ${sidebarVisible ? "w-4/5" : "w-full"}`}>

        <div className="w-full flex h-full flex-col items-center justify-center py-12 relative px-8">
          {!showStep2 && (
            <h1 className="text-white text-3xl font-bold mb-8">
              Connect to Azure Database
            </h1>
          )}
          {!showStep2 && (
            <div className="bg-[#0C2C54] w-3/4 h-full gap-[1rem] flex flex-col rounded-lg p-8 mx-auto relative">
              <div>
                <p className="text-[#B0B0B0] text-lg font-bold mb-4">Step 1</p>
                <p className="text-[#B0B0B0] text-lg mb-6">
                  Provide Azure Database Credentials
                </p>
              </div>
              <div className="flex flex-col gap-[1rem]">
                <div className="mb-4">
                  <label htmlFor="endpoint" className="block mb-2 text-white">
                    Connection string or Endpoint
                  </label>
                  <input
                    type="text"
                    id="endpoint"
                    className="form-input mt-1 block w-full rounded-lg p-3 outline-none"
                    placeholder="ex. https://example.com"
                    value={endpoint}
                    onChange={handleEndpointChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="apikey" className="block mb-2 text-white">
                    API Key
                  </label>
                  <input
                    type="text"
                    id="apikey"
                    className="form-input mt-1 block w-full rounded-lg p-3 outline-none"
                    placeholder="API Key"
                    value={apiKey}
                    onChange={handleApiKeyChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="databaseName" className="block mb-2 text-white">
                    Database Name
                  </label>
                  <input
                    type="text"
                    id="databaseName"
                    className="form-input mt-1 block w-full rounded-lg p-3 outline-none"
                    placeholder="Database Name"
                    value={databaseName}
                    onChange={handleDatabaseNameChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="containerName" className="block mb-2 text-white">
                    Container Name
                  </label>
                  <input
                    type="text"
                    id="containerName"
                    className="form-input mt-1 block w-full rounded-lg p-3 outline-none"
                    placeholder="Container Name"
                    value={containerName}
                    onChange={handleContainerNameChange}
                    required
                  />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 p-8 flex items-center justify-end">
                <button
                  className="text-[#B0B0B0] flex gap-2 justify-end text-right font-bold rounded w-32"
                  onClick={handleStep1Submit}
                >
                  Step 2
                  <img src={NextIcon} width={23} alt="Next Icon" />
                </button>
              </div>
            </div>
          )}
          {showStep2 && (
            <Step2 onBack={handleStep2Back} schemaData={schemaData} database_name={databaseName} container_name={containerName} user={user} container={container}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connector;
