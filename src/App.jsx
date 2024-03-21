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
import Login from "./Components/Login_Page/Login";
import Auth from "./Components/Login_Page/auth";

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
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { user, login, logout } = Auth(pca, scopes);

  useEffect(() => {
    const checkAuthentication = async () => {
      const accounts = pca.getAllAccounts();
      if (accounts.length > 0) {
        setAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuthentication();
  }, []);
  console.log(authenticated)
  if (loading) {
    // Render loading indicator while authentication check is in progress
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
            <Route path="/chat" element={authenticated?<Chatbot />:<Navigate to={"/login"}></Navigate>} />
            <Route path="/connector" element={authenticated?<Connector />:<Navigate to={"/login"}></Navigate>} />
            <Route
              path="/"
              element={authenticated?<Dashboard user={user} logout={logout} />:<Navigate to={"/login"}></Navigate>}
            />
          <Route path="/login" element={!authenticated?<Login login={login}></Login>:<Navigate to={"/"}></Navigate>}/>

      </Routes>
    </Router>
  );
}

export default App;
