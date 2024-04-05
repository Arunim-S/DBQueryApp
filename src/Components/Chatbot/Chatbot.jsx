import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { CosmosClient } from "@azure/cosmos";
import UserData from "./user";
import Message from "./message";
import { ClipLoader, SyncLoader } from "react-spinners"
import { LineWave } from "react-loader-spinner";
import "../../App.css";
import Dropdown from "../Dropdown/Dropdown";
import fetchContainers from "../../fetchContainers";
import fetchDatabase from "../../fetchDatabases";
import { Client } from "langsmith/client";
// import { StringEvaluator } from "langsmith/evaluation";
// import { Run, Example } from "langsmith";
// import { EvaluationResult } from "langsmith/evaluation";
// import { runOnDataset } from "langchain/smith";
// const datasetName = "Rap Battle Dataset";


const chatbot = ({ user }) => {
  let [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [containers, setContainers] = useState([]);
  const [databases, setDatabases] = useState([]);
  const [selector, setSelector] = useState(0);
  const [selectorC, setSelectorC] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingMessagesDelete, setLoadingMessagesDelete] = useState(false);
  const connection_string =
    "AccountEndpoint=https://testafschatdb.documents.azure.com:443/;AccountKey=tzam6UyAkfzzWCyzg4MQYVSjLt5C8J6fprjgeQNBk21T4cKzTusYIF9YBywPWhEGqKKTxBcbBck5ACDbV7X85g==;";
  const clientCosmos = new CosmosClient(connection_string);
  const container = clientCosmos.database("Testing_Purpose").container("test");
  const userName = user?.name;
  useEffect(() => {
    fetchContainers(databases, selector, setContainers);
  }, [databases, selector]);

  useEffect(() => {
    fetchDatabase(setDatabases);
  }, []);

  databases?.map((e, index) => {
    if (e == selector) {
      setSelector(index)
    }
  })

  /**
   * Toggles the sidebar open/close.
   */
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  /**
   * Retrieves messages from Cosmos DB and updates the corresponding states.
   */
  const getMessagesFromCosmosDB = async () => {
    try {
      setLoadingMessages(true);
      const { resources } = await container.items.readAll().fetchAll();
      let userExists = false;
      resources.forEach((e) => {
        if (e.userName === userName) {
          setChatHistory(e.chats);
          userExists = true;
          setUserData(e);
          // Exit the loop early since the user is found
          return;
        }
      });

      if (!userExists && userName) {
        const timestamp = new Date();
        const userId = generateRandomUserId();
        const chats = [];
        const newUser = new UserData(userId, userName, chats, timestamp);
        await container.items.create(newUser);
        setChatHistory([]);
      }
    } catch (error) {
      console.error("Error retrieving messages from Cosmos DB:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    getMessagesFromCosmosDB();
  }, [user]);

  /**
   * Generates a random user ID.
   * @returns {string} A random user ID.
   */
  const generateRandomUserId = () => {
    return Math.random().toString(36).substr(2, 8);
  };

  /**
   * Adds a message to the chat history and updates the database.
   * @param {string} userName - The username.
   * @param {string} answer - The answer provided.
   * @param {string} question - The question asked.
   * @param {Object} userData - User data object.
   */
  const addMessage = async (userName, answer, question, userData) => {
    try {
      const timestamp = new Date();
      const newMessage = new Message(userName, question, answer, timestamp);

      userData.chats.push(newMessage);
      // Update chat history state
      setChatHistory(userData.chats);
      // Update user data state
      setUserData(userData);
      // Update the Cosmos DB with the updated user data
      await container.items.upsert(userData);
    } catch (error) {
      console.error("Error adding message:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const sendMessage = async () => {
    setLoading(true);
    if (messageInput.trim() === "") return;

    let prompt1 = {
      role: "system",
      content:
        'You are a helpful assistant that provides answers to user\'s queries. When a user asks a question, follow these steps:\n\n1. First, try to generate a response based on the context of your chat history with the user. If you are unable to generate a satisfactory response, then proceed to the next step.\n\n2. Search the Azure Cosmos Database using the execute_query function. You have direct access to the database through this function.\n\nThe Azure Cosmos Database has the following schema:\njson\n{\n    "id": "string",\n    "email": "string",\n    "timestamp": "\'mm/dd/yyyy\' (string ex:\'12/01/2023\')",\n    "questions": [\n        {\n            "userName": "string",\n            "questionType": "string",\n            "userQuestion": "string",\n            "persona": "string"\n        }\n    ]\n}  \n\n\nYou can execute queries such as:\n- "SELECT TOP {top_results} q.userQuestion FROM c JOIN q IN c.questions WHERE c.email = \'{email}\' ORDER BY c.timestamp DESC"\n- "SELECT DISTINCT VALUE q.userName FROM c JOIN q IN c.questions"\n- "SELECT DISTINCT VALUE q.personna FROM c JOIN q IN c.questions", etc.\n\nUse the results from the `execute_query` function to generate a final response to the user\'s query.',
    };
    let prompt2 = {
      role: "user",
      content: "Who are you and what are your capabilities?",
    };
    let prompt3 = {
      role: "assistant",
      content:
        "I am an intelligent digital assistant designed to provide accurate responses to your queries. Here are some of my capabilities:\n\n1. I can execute complex queries on the Azure Cosmos Database, such as retrieving the most recent questions from a specific email, listing distinct user names, or identifying unique personnas.\n\nIn essence, I am capable of providing quick, reliable, and detailed responses to your queries.",
    };

    // Send message to endpoint
    let body = [];
    body.push(prompt1);
    body.push(prompt2);
    body.push(prompt3);
    body.push({ role: "user", content: messageInput.trim() });

    let data = JSON.stringify(body);
    setMessageInput("");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://db-query.azurewebsites.net",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);

      // Append assistant's response to chat history

      // Update Cosmos DB with user's message
      await addMessage(
        "user",
        response.data.content,
        messageInput.trim(),
        userData
      );
    } catch (error) {
      console.log(error);
    }
  };

  function processText(inputString) {
    if (!inputString) return;
    const stringWithBreaks = inputString.replace(/\n/g, "<br>");
    const stringWithoutUrls = stringWithBreaks.replace(
      /\((https?:\/\/[^\s]+)\)/g,
      ""
    );
    const stringWithHeadings = stringWithoutUrls.replace(
      /\*\*(.*?)\*\*/g,
      '<h1 style="font-size: 1.5rem">$1</h1>'
    );
    const boldText = stringWithHeadings.replace(/`([^`]+)`/g, "<b>$1</b>");
    // console.log(boldText);
    return boldText;
  }

  const handleDeleteMessage = async (index) => {
    setLoadingMessagesDelete(true);
    setTimeout(async () => {
      const updatedMessages = [...userData.chats]; // Create a copy of the array
      updatedMessages.splice(index, 1);
      setChatHistory(updatedMessages); // Update the state with the copy
      userData.chats = updatedMessages; // Update the user data
      await container.items.upsert(userData); // Update the database
      setLoadingMessagesDelete(false);
    }, 2000);
  };

  const client = new Client({
    apiUrl: "https://api.langchain.com",
    apiKey: "ls__3ef32ca832884d959bc1f43ee0dc1dbd",
  });
  console.log(client)

// Define evaluators
// const mustMention = async ({ run, example }) => {
//   const mustMentionPhrases = example && example.outputs && example.outputs.must_contain ? example.outputs.must_contain : [];
//   const runOutput = run && run.outputs ? run.outputs.output : '';
//   const score = mustMentionPhrases.every(phrase =>
//     runOutput.includes(phrase)
//   );
//   return {
//     key: "must_mention",
//     score: score,
//   };
// };

// runOnDataset(
//   predictResult, 
//   datasetName,
//   {
//     evaluationConfig: {customEvaluators: [mustMention]}, 
//     projectMetadata: {
//       version: "1.0.0",
//     },
//   }
// );


  // function jaccardChars(output, answer) {
  //   const predictionChars = new Set(output.trim().toLowerCase());
  //   const answerChars = new Set(answer.trim().toLowerCase());
  //   const intersection = [...predictionChars].filter(x => answerChars.has(x));
  //   const union = new Set([...predictionChars, ...answerChars]);
  //   return intersection.length / union.size;
  // }
  // async function grader(config) {
  //   let value;
  //   let score;
  //   if (config.answer === null || config.answer === undefined) {
  //     value = "AMBIGUOUS";
  //     score = 0.5;
  //   } else {
  //     score = jaccardChars(config.prediction, config.answer);
  //     value = score > 0.9 ? "CORRECT" : "INCORRECT";
  //   }
  //   return { score: score, value: value };
  // }

  // const evaluator = new StringEvaluator({
  //   evaluationName: "Jaccard",
  //   gradingFunction: grader,
  // });

  // const runs = client.listRuns({
  //   projectName: "my_project",
  //   executionOrder: 1,
  //   error: false,
  // });
  // for (const run of runs) {
  //   client.evaluateRun(run, evaluator);
  // }

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="flex w-full h-full">
        {sidebarOpen ? (
          <div className="w-1/5">
            <Sidebar user={user} setSidebarOpen={setSidebarOpen} containersList={containers} />
          </div>
        ) : (
          <div className="p-8">
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
        <div className="flex flex-col mx-auto w-full chats-scroll pt-4">
          <div className="flex justify-center gap-4 p-4">
            <div className="gap-4 flex">
              <Dropdown options={databases} setSelector={setSelector} type={"Database"}></Dropdown>
            </div>

            <div className="gap-4 flex">
              <Dropdown options={containers} setSelector={setSelectorC} type={"Container"}></Dropdown>
            </div>
          </div>

          {!loadingMessages ? (
            <div className="flex flex-col h-full w-full overflow-y-auto gap-2 p-4">
              {chatHistory.map((message, index) => (
                <div
                  className="flex rounded-xl bg-gray-600 gap-4 p-4 w-3/4 mx-auto"
                  key={index}
                >
                  <div className="flex flex-col w-full gap-4">
                    <div className="flex flex-col text-white text-left gap-4 mb-2">
                      <h1 className="font-bold">You</h1>
                      <p>{message.question}</p>
                    </div>
                    <div className="flex flex-col text-white text-left gap-4 mb-2">
                      <h1 className="font-bold">Assistant</h1>
                      <div
                        className=" text-white"
                        dangerouslySetInnerHTML={{
                          __html: processText(message.answer),
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    {!loadingMessagesDelete ? (
                      <button
                        className="text-center"
                        onClick={() => handleDeleteMessage(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          fill="#fff"
                          version="1.1"
                          id="Capa_1"
                          width="24px"
                          height="24px"
                          viewBox="0 0 482.428 482.429"
                          xml:space="preserve"
                        >
                          <g>
                            <g>
                              <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098    c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117    h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828    C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879    C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096    c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266    c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979    V115.744z" />
                              <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z" />
                              <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z" />
                              <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07    c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z" />
                            </g>
                          </g>
                        </svg>
                      </button>
                    ) : (
                      <LineWave
                        visible={true}
                        height="100"
                        width="100"
                        color="#fff"
                        ariaLabel="line-wave-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        firstLineColor=""
                        middleLineColor=""
                        lastLineColor=""
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white text-center flex w-full h-full items-center justify-center">
              <SyncLoader color="#fff" />
            </div>
          )}
          <div className="w-3/4 mx-auto">
            <div className="mx-auto flex items-center gap-2 p-4">
              <div className="relative flex-grow">
                <textarea
                  type="text"
                  id="search-container"
                  className="form-input bg-gradient-to-br from-blue-500 to-indigo-800 mt-1 block w-full outline-none rounded-[1rem] pl-4 pr-14 py-3 text-white transition-all ease-in-out"
                  placeholder="Search"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button
                  className="absolute right-0 top-0 h-full flex items-center justify-center px-4"
                  onClick={sendMessage}
                >
                  {loading ? (
                    <ClipLoader color="#fff" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2rem"
                      height="2rem"
                      viewBox="0 0 24 24"
                      fill="#fff"
                    >
                      <path
                        d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chatbot;
