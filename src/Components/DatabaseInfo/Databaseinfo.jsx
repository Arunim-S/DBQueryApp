import React, { useState, useEffect } from "react";
import "./DatabaseInfoPage.css"; // Import CSS file

const DatabaseInfoPage = ({ user, container }) => {
    const [databases, setDatabases] = useState([]);

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

    return (
        <div className="database-info">
            <h1>Database Information</h1>
            <table>
                <thead>
                    <tr>
                        <th>Database Name</th>
                        <th>Container Name</th>
                        <th>Schema</th>
                        <th>Last Update Time</th>
                    </tr>
                </thead>
                <tbody>
                    {databases?.map((database, index) => (
                        <React.Fragment key={index}>
                            {database?.containers?.map((container, containerIndex) => (
                                <tr key={containerIndex}>
                                    {containerIndex === 0 && (
                                        <td rowSpan={database.containers.length}>
                                            {database.name}
                                        </td>
                                    )}
                                    <td>{container.name}</td>
                                    <td>
                                        <pre>{container.schema}</pre>
                                    </td>
                                    <td>{container.timestamp}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DatabaseInfoPage;
