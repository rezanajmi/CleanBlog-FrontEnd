"use client";

import React, { useContext, useEffect, useState } from "react";
import * as tokenHelper from "../helpers/cookieHelper";
import { successToast } from "@/helpers/toastHelper";

interface AuthContextModel{
  token: string;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const initialModel: AuthContextModel = {
  token: "",
  isAuthenticated: false,
  login: (token: string) => {},
  logout: () => {},
};

const AuthContext = React.createContext<AuthContextModel>(initialModel);

export const AuthContextProvider = (props: any) => {
  const initialToken = tokenHelper.getToken();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    setToken(initialToken);
  });

  const loginHandler = (token: string) => {
    tokenHelper.setToken(token);
    setToken(token);
    successToast("You logged in successfuly.");
  };

  const logoutHandler = () => {
    tokenHelper.removeToken();
    setToken("");
    successToast("You logged out successfuly.");
  };

  const contextValue: AuthContextModel = {
    token: token,
    isAuthenticated: !!token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
