import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Chatbot from "./Components/Chatbot/Chatbot";
import Connector from "./Components/Connectors/Connector";
import { PublicClientApplication } from "@azure/msal-browser";
import Login from "./Components/Login_Page/Login";
import Auth from "./Components/Login_Page/auth";
import Account from "./Components/Account/Account";
/**
 * Microsoft Authentication Configuration.
 * @typedef {Object} MsalConfig
 * @property {Object} auth - Authentication configuration.
 * @property {string} auth.clientId - The client ID of the application registered in Azure Active Directory.
 * @property {string} auth.authority - The authority URL for the application.
 * @property {string} auth.redirectUri - The redirect URI for the application.
 */

/**
 * @type {MsalConfig}
 */
const msalConfig = {
  auth: {
    clientId: "c5a73855-31a7-4bfa-a0db-4f7ddef05b49",
    authority:
      "https://login.microsoftonline.com/4d4343c6-067a-4794-91f3-5cb10073e5b4",
    redirectUri: "http://localhost:3000/",
  },
};

/**
 * Public Client Application instance.
 * @type {PublicClientApplication}
 */
const pca = new PublicClientApplication(msalConfig);
const scopes = ["user.read"];

/**
 * Main application component.
 * @returns {JSX.Element} The main application component.
 */
function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  let history = useNavigate();
  /**
   * Authentication hook.
   * @type {Object} auth
   * @property {Object} auth.user - Current user object.
   * @property {Function} auth.login - Function to initiate login process.
   * @property {Function} auth.logout - Function to initiate logout process.
   */
  const { user, login, logout } = Auth(pca, scopes);

  useEffect(() => {
    /**
     * Function to check authentication status.
     */
    const checkAuthentication = async () => {
      let checkAuth = localStorage.getItem("isAuthenticated");
      if (checkAuth) {
        setAuthenticated(true);
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);
  /**
   * Render function for the main application component.
   * @returns {JSX.Element} The rendered component.
   */
  return (
    <Routes>
      <Route
        path="/chat"
        element={
          authenticated ? <Chatbot user={user}/> : <Navigate to={"/"}></Navigate>
        }
      />
      <Route
        path="/connector"
        element={
          authenticated ? <Connector user={user}/> : <Navigate to={"/"}></Navigate>
        }
      />
      <Route
        path="/account"
        element={
          authenticated ? <Account user={user} logout={logout}/> : <Navigate to={"/"}></Navigate>
        }/>
      <Route
        path="/"
        element={<Dashboard user={user} login={login} logout={logout} />}
      />
    </Routes>
  );
}

export default App;
