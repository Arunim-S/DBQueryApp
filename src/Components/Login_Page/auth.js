import { useState, useEffect } from "react";

const useAuthentication = (pca, scopes) => {
  const [user, setUser] = useState(null);

  useEffect(()  => {
    pca?.initialize();
    const accounts = pca.getAllAccounts();
    if (accounts.length > 0) {
      setUser(accounts[0]);
      console.log(user)
      if(user){localStorage.setItem("userName", user.name);}
    }
  }, [pca]);

  const login = async () => {
    await pca.loginPopup({ scopes });
    const accounts = pca.getAllAccounts();
    setUser(accounts[0]);
    localStorage.setItem("userName", user.name);
    window.reload();
  };

  const logout = async () => {
    pca.logout();
    setUser(null);
    localStorage.removeItem("userName")
    localStorage.clear();
    sessionStorage.clear();
  };

  return { user, login, logout };
};

export default useAuthentication;
