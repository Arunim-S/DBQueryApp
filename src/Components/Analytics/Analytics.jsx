import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Analytics = ({ user, container }) => {
    let [sidebarOpen, setSidebarOpen] = useState(false);
    console.log(container)
    const data = {
        "userId": "cuy3nlbs",
        "userName": "Arunim Singhal",
        "chats": [
            {
                "userName": "user",
                "question": "hi",
                "answer": "Hello! How can I assist you today? If you have any questions or need information, feel free to ask.",
                "timestamp": "2024-04-08T17:47:12.595Z",
                "databaseName": "Testing_Purpose",
                "containerName": "test"
            },
            {
                "userName": "user",
                "question": "What is the schema used?",
                "answer": "The schema used for the database entries is as follows:\n\n```json\n{    \n    \"id\": \"string\",    \n    \"email\": \"string\",    \n    \"timestamp\": \"date\",    \n    \"questions\": [    \n        {    \n            \"userName\": \"string\",    \n            \"questionType\": \"string\",    \n            \"userQuestion\": \"string\",    \n            \"personna\": \"string\"    \n        }    \n    ]    \n}\n```\n\nThis schema indicates that each database entry contains a unique identifier (`id`), an email address (`email`), a timestamp (`timestamp`), and an array of `questions`. Each question in the array includes the following fields:\n\n- `userName`: The name of the user who asked the question.\n- `questionType`: The type of question, such as 'New Chat' or 'Follow Up'.\n- `userQuestion`: The actual question asked by the user.\n- `personna`: The persona assigned to the question, which could be one of the listed personas such as 'Knowledge Asst', 'Writing Asst', etc.",
                "timestamp": "2024-04-08T17:51:04.269Z",
                "databaseName": "Testing_Purpose",
                "containerName": "test"
            },
            {
                "userName": "user",
                "question": "hi",
                "answer": "Hello! How can I assist you today? If you have any questions or need information, feel free to ask.",
                "timestamp": "2024-04-11T11:58:53.448Z",
                "databaseName": "Testing_Purpose",
                "containerName": "test"
            }
        ]
    };

    // Function to count total users
    const countTotalUsers = (data) => {
        const uniqueUsers = new Set(data.chats.map(chat => chat.userName));
        return uniqueUsers.size;
    };

    // Function to count daily questions asked by users
    const countDailyQuestions = (data) => {
        const questionsByDate = {};
        data.chats.forEach(chat => {
            const date = chat.timestamp.split('T')[0];
            if (questionsByDate[date]) {
                questionsByDate[date]++;
            } else {
                questionsByDate[date] = 1;
            }
        });
        return questionsByDate;
    };



    const totalUsers = countTotalUsers(data);
    const dailyQuestions = countDailyQuestions(data);
    const dailyQuestionsArray = Object.entries(dailyQuestions).map(([date, count]) => ({ date, count }));
    const pieChartData = [
        { name: 'Total Users', value: totalUsers },
    ];

    return (
        <div className='flex flex-row w-full min-h-screen bg-black relative text-white'>
            {sidebarOpen ? (
                <div className='flex'>
                    <Sidebar user={user} setSidebarOpen={setSidebarOpen}></Sidebar>
                </div>
            ) :
                (
                    <div className='p-8'>
                        <button onClick={(e) => setSidebarOpen(true)}>
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
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />
                                <path
                                    d="M4 12L20 12"
                                    stroke="#fff"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />
                                <path
                                    d="M4 6L20 6"
                                    stroke="#fff"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            <div className='flex flex-col p-8 text-white gap-2 w-full'>
                <h1 className='text-2xl font-bold'>Analytics</h1>
                <div className='bg-white w-full h-1'></div>
                <div className='gap-8 flex w-full py-8'>
                    <div className='flex flex-col w-full gap-8 p-8 bg-gray-700 rounded-2xl'>
                        <h2 className='text-xl font-bold flex justify-between'>Total Users <p>{totalUsers}</p></h2>
                        <div className='flex justify-center items-center outline-none'>
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={pieChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8ab7ff"
                                    label
                                />
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-8 p-8 bg-gray-700 rounded-2xl'>
                        <h2 className='text-xl font-bold'>Daily Queries</h2>
                        <div className='flex justify-center items-center'>
                        <LineChart width={600} height={300} data={dailyQuestionsArray}>
                            <XAxis tick={{ fill: 'white' }} dataKey="date" tickMargin={20} />
                            <YAxis tick={{ fill: 'white' }} tickMargin={10} />
                            <CartesianGrid stroke="#fff" strokeDasharray="5 5" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#ff4438" />
                        </LineChart>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Analytics