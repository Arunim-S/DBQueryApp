import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Chatbot from "./Components/Chatbot/Chatbot";
import Connector from "./Components/Connectors/Connector";
import { PublicClientApplication } from "@azure/msal-browser";
const msalConfig = {
  auth: {
    clientId: "c5a73855-31a7-4bfa-a0db-4f7ddef05b49",
    authority:
      "https://login.microsoftonline.com/4d4343c6-067a-4794-91f3-5cb10073e5b4",
    redirectUri: "http://localhost:3000/",
  },
};

const pca = new PublicClientApplication(msalConfig);
const scopes = ["user.read"];

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuthentication = async () => {
      const userExists = localStorage.getItem("userAccount");
      console.log(userExists)
      if (userExists !== "authenticated") {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    };

    checkAuthentication();
  }, []);
  console.log(authenticated)
  if (!authenticated) {
    return <Dashboard pca={pca} scopes={scopes}></Dashboard>;
  }
  let user = localStorage.getItem("userAccount"); 
  console.log(JSON.parse(user));
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard pca={pca} scopes={scopes} />
          }
        />
        {
          authenticated && (
            <>
              <Route path="/chat" element={<Chatbot />} />
              <Route path="/connector" element={<Connector />} />
            </>
          )
        }
        {!authenticated && <Navigate to="/" />}
      </Routes>
    </Router>
  );
}

export default App;
