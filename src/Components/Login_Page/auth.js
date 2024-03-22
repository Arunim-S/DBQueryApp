import { useState, useEffect } from "react";
import {
  useNavigate
} from "react-router-dom";
/**
 * Custom hook for handling authentication logic.
 * @param {PublicClientApplication} pca - The Public Client Application instance.
 * @param {string[]} scopes - The scopes for authentication.
 * @returns {Object} An object containing user information and authentication functions.
 */
const useAuthentication = (pca, scopes) => {
  /**
   * State hook for managing the user object.
   * @type {[Object | null, Function]}
   */
  const [user, setUser] = useState({name: "", email: ""});

  let history = useNavigate();

  /**
   * Effect hook to initialize authentication and retrieve user information.
   */
  useEffect(() => {
    pca?.initialize();
    const accounts = pca.getAllAccounts();
    if (accounts.length > 0) {
      setUser(accounts[0]);
      if (user) {
        localStorage.setItem("userName", user.name);
      }
    }
  }, [pca]);

  /**
   * Function for initiating the login process.
   */
  const login = async () => {
    try {
      const loginRes = await pca.loginPopup({ scopes });
      if (loginRes && loginRes.account && loginRes.account.name) {
        const newUser = {
          name: loginRes.account.name,
          email: loginRes.account.username
        };
        setUser(newUser);
        localStorage.setItem("userName", newUser.name);
        localStorage.setItem("isAuthenticated", "true");
        console.log("User Logged in Complete");
      }
    } catch (err) {
      console.log("Login error:", err);
    }
  };
  /**
   * Function for initiating the logout process.
   */
  const logout = async () => {
    pca.logout();
    setUser(null);
    localStorage.removeItem("userName");
    localStorage.removeItem("isAuthenticated");
    localStorage.clear();
    sessionStorage.clear();
    console.log("User Logger Out Successful")
  };

  return { user, login, logout };
};

export default useAuthentication;
