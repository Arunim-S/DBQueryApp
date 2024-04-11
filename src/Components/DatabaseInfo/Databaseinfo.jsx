import React, { useState, useEffect, useRef } from "react";
import "./DatabaseInfoPage.css"; // Import CSS file
import Sidebar from "../Sidebar/Sidebar";
const DatabaseInfoPage = ({ user, container }) => {
    const [databases, setDatabases] = useState([]);
    const [selectedSchema, setSelectedSchema] = useState(null);
    const textAreaRef = useRef(null);
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
    const [editorHeight, setEditorHeight] = useState("60vh");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { resources } = await container.items.readAll().fetchAll();
                const userData = resources.find(e => e.userName === user?.name);
                if (userData) {
                    setDatabases(userData.databases);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user, container]);

    const showSchema = (schema) => {
        setSelectedSchema(schema);
    };
    const handlePaste = () => {
        navigator.clipboard.readText().then((text) => {
          setCode(text);
        });
      };
    
      const handleBack = () => {
        onBack();
      };
      const handleCodeChange = (event) => {
        setCode(event.target.value);
      };
      const formatCode = () => {
        const jsonObject = JSON.parse(code);
        const formattedJson = JSON.stringify(x, null, 2);
        console.log(formattedJson)
        setCode(jsonObject)
      };

    return (
        <div className="flex flex-row w-full min-h-screen bg-black relative text-white">
            <div className="">
                <Sidebar user={user} />
            </div>
            <div className="w-full px-24 mx-auto">
                <h1 className="text-2xl text-center p-12 font-bold">Database Information</h1>
                {databases?.map((database, index) => (
                    <div key={index} className="database flex flex-col w-full ">
                        {database.containers?.map((container, containerIndex) => (
                            <div key={containerIndex} className="flex bg-gray-700 p-4">
                                <div className="flex-grow">
                                    <h2 className="">Database Name: {database.name}</h2>
                                    <h3>Container Name: {container.name}</h3>
                                    <h3>Last Update Time: {container.timestamp}</h3>
                                </div>
                                <div className="m-auto">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => showSchema(container.schema)}>Show Schema</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                {selectedSchema && (
                    <div className="schema-popup rounded-2xl flex mx-auto bg-gray-700 m-4">
                        <div
                            className="code-editor w-full"
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
                            <button className=" text-[#B0B0B0] flex gap-2 justify-end text-right font-bold rounded hover:text-gray-200" onClick={() => setSelectedSchema(null)}>Close</button>
                        
                            </div>
                            <textarea
                                ref={textAreaRef}
                                value={selectedSchema}
                                onChange={handleCodeChange}
                                className="w-full h-full bg-[#1e1e1e] px-8 py-20 text-[#d4d4d4] rounded-lg outline-none"
                                placeholder="Enter JSON here ..."
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DatabaseInfoPage;
