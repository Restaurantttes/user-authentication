import React, { createContext, useContext } from "react";
import {
  removeEncryptedDataAsyncStorage,
  saveEncryptedDataAsyncStorage
} from "../../utils/storage";
import { AuthenticationContext } from "./AuthenticationContext";

interface SessionContextType {
  login: (userData: UserDataType) => Promise<void>;
  logout: () => Promise<void>
}

interface LoginData {
  __typename: string;
  accessToken: string;
  error: boolean;
  refreshToken: string;
  success: boolean;
}

interface UserDataType {
  login: {
    email: string;
    password: string;
  };
  loginData: LoginData;
}

export const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);

export const SessionContextProvider: React.FC = ({ children }) => {
  const {
    setAccessToken,
    setRefreshToken,
    setIsActiveUser,
    setLoadingAuthentication,

  } = useContext(AuthenticationContext);

  async function login(userData: UserDataType): Promise<void> {
    setLoadingAuthentication(true);
    setAccessToken(userData.loginData.accessToken);
    saveEncryptedDataAsyncStorage("accessToken", userData.loginData.accessToken);

    setRefreshToken(userData.loginData.refreshToken);
    saveEncryptedDataAsyncStorage("refreshToken", userData.loginData.refreshToken);

    setIsActiveUser(true);

    setLoadingAuthentication(false);
  }

  async function logout() {
    setLoadingAuthentication(true);
    removeEncryptedDataAsyncStorage("accessToken");
    setAccessToken(null);
    setIsActiveUser(false);
    removeEncryptedDataAsyncStorage("refreshToken");
    setRefreshToken(null);
    await setLoadingAuthentication(false);
  }

  return (
    <SessionContext.Provider value={{ login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};