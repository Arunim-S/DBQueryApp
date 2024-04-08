import React, { useState, useEffect, useRef } from "react";
import NextIcon from "../../row1_1_.png";
import prettier from "prettier";
import Database from "./database";
import Containers from "./containers";


const Step2 = ({ onBack, schemaData, database_name, container_name, user, container }) => {
  const [code, setCode] = useState(JSON.stringify({
    "firstName": "John",
    "lastName": "Doe",
    "age": 30,
    "email": "john.doe@example.com",
    "address": {
      "street": "123 Main Street",
      "city": "Anytown",
      "zipcode": "12345"
    },
    "hobbies": ["reading", "gardening", "cooking"],
    "isActive": true
  }));
  const [userData, setUserData] = useState(null);
  const [editorHeight, setEditorHeight] = useState("60vh");
  const textAreaRef = useRef(null);
  console.log(database_name, container_name)

  async function updateDatabase(database_name, container_name, schema) {
    const timestamp = new Date();
    const newContainer = new Containers(container_name, schema, timestamp);
    const { resources } = await container.items.readAll().fetchAll();
    console.log(user)

    resources.forEach((e) => {
      if (e.userName === user?.name) {
        setUserData(e);
        return;
      }
    });
    console.log(userData)
    let database_found=false;
    if(userData.databases.length>0)
    {
      for (const item of userData.databases) {
        if (item.name === database_name) {
          database_found=true;
          item.containers.push(newContainer)
          item.timestamp = timestamp;
          break;
        }
      }
    }
    const newDatabase = new Database(database_name, [newContainer], timestamp);
    if(database_found == false)
    {
      userData.databases.push(newDatabase);
    }
    await container.items.upsert(userData);
  }

  useEffect(() => {
    const jsonString = JSON.stringify(schemaData.schema, null, 2)
    const trimmedJsonString = jsonString.trim();
    // Parse the JSON string into an object
    const jsonObject = JSON.parse(trimmedJsonString);
    const formattedJson = JSON.stringify(jsonObject, null, 2);
    console.log(formattedJson)
    setCode(jsonObject)
    const handleResize = () => {
      const height = window.innerHeight > 768 ? "60vh" : "30vh";
      setEditorHeight(height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setCode(text);
    });
  };

  const handleBack = () => {
    onBack();
  };

  const formatCode = () => {
    const jsonObject = JSON.parse(code);
    const formattedJson = JSON.stringify(x, null, 2);
    console.log(formattedJson)
    setCode(jsonObject)
  };







  return (
    <div className="bg-[rgb(12,44,84)] w-3/4 max-w-screen-lg gap-[1rem] h-full flex flex-col rounded-lg p-8 relative">
      <div className="flex flex-col flex-grow ">
        <h2 className="text-[#B0B0B0] text-lg font-bold mb-4">Step 2</h2>
        <p className="text-[#B0B0B0] text-lg mb-6">Provide JavaScript Code</p>
        <div
          className="code-editor"
          style={{ height: editorHeight, position: "relative" }}
        >
          <div className="flex w-full justify-end p-8 absolute top-0 gap-4 right-0">
            <button
              className="text-[#B0B0B0] flex gap-2 justify-end text-right font-bold rounded hover:text-gray-200"
              onClick={handlePaste}
            >
              Paste
            </button>
            <button
              className="text-[#B0B0B0] flex gap-2 justify-end text-right font-bold rounded hover:text-gray-200"
              onClick={formatCode}
            >
              Format
            </button>
          </div>
          <textarea
            ref={textAreaRef}
            value={code}
            onChange={handleCodeChange}
            className="w-full h-full bg-[#1e1e1e] px-8 py-20 text-[#d4d4d4] rounded-lg outline-none"
            placeholder="Enter JSON here ..."
          />
        </div>
      </div>
      <div className="flex justify-end mt-auto gap-4">
        <button
          className="text-[#B0B0B0] flex gap-2 justify-end text-right font-bold rounded w-32"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="text-[#B0B0B0] flex gap-2 justify-end text-right font-bold rounded w-32"
          onClick={(e) => { updateDatabase(database_name, container_name, code) }}
        >
          Submit Code
          <img src={NextIcon} width={23} alt="Next Icon" />
        </button>
      </div>
    </div>
  );
};

export default Step2;
