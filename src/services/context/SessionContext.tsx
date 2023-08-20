import {
  authenticateAsync,
  supportedAuthenticationTypesAsync,
} from "expo-local-authentication";
import { t } from "i18next";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  removeEncryptedDataAsyncStorage,
  saveDataAsyncStorage,
  saveEncryptedDataAsyncStorage
} from "../../utils/storage";
import { AuthenticationContext } from "./AuthenticationContext";

enum BiometricType {
  TouchID = 1,
  FaceID = 2,
  Iris = 3,
  None = 0,
}

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
    isBiometricAvailable,
    permissionBiometric,
  } = useContext(AuthenticationContext);

  const [biometricType, setBiometricType] = useState<BiometricType>(
    BiometricType.None
  );

  useEffect(() => {
    (async () => {
      const type = await supportedAuthenticationTypesAsync();
      setBiometricType(parseInt(type?.toString()) || BiometricType.None);
    })();
  }, []);

  async function login(userData: UserDataType): Promise<void> {
    setLoadingAuthentication(true);
    setAccessToken(userData.loginData.accessToken);
    saveEncryptedDataAsyncStorage("accessToken", userData.loginData.accessToken);

    setRefreshToken(userData.loginData.refreshToken);
    saveEncryptedDataAsyncStorage("refreshToken", userData.loginData.refreshToken);

    setIsActiveUser(true);

    if (
      isBiometricAvailable &&
      (permissionBiometric === undefined || permissionBiometric === null)
    ) {
      alertPermissionBiometricAuthentication(
        biometricType,
        JSON.stringify(userData.login)
      );
    }

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

const activateBiometricAuth = async (credentials: any) => {
  const result = await authenticateAsync();
  if (result.success) {
    saveDataAsyncStorage("biometricPermission", "true");
    saveEncryptedDataAsyncStorage("authCredentials", credentials);
  }
};

const alertPermissionBiometricAuthentication = (
  type: BiometricType,
  credentials: any
) => {
  const message =
    type === BiometricType.TouchID
      ? t("authentication.biometric.message-touch-id")
      : type === BiometricType.FaceID
        ? t("authentication.biometric.message-face-id")
        : type === BiometricType.Iris
          ? t("authentication.biometric.message-iris")
          : t("authentication.biometric.message");

  Alert.alert(t("authentication.biometric.title"), message, [
    {
      text: t("authentication.cancel"),
      onPress: () => saveDataAsyncStorage("biometricPermission", "false"),
      style: "cancel",
    },
    {
      text: t("authentication.accept"),
      onPress: () => activateBiometricAuth(credentials),
    },
  ]);
};
