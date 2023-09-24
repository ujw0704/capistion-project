import { createContext, useContext, useState, useEffect } from "react";
import { checkAuthStatus } from "../utils";

const LoginContext = createContext(null);

export const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Load authentication status from the cookie on component mount
  useEffect(() => {
    const isAuthenticated = checkAuthStatus();
    setIsLoggedIn(isAuthenticated);
  }, []);

  const context = {
    isLoggedIn,
    setIsLoggedIn,
    inputValue,
    setInputValue,
  };

  return (
    <LoginContext.Provider value={context}>{children}</LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
