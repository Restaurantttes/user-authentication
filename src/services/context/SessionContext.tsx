import { authenticateAsync, supportedAuthenticationTypesAsync } from "expo-local-authentication";
import { t } from "i18next";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { saveDataAsyncStorage, saveEncryptedDataAsyncStorage } from "src/utils/storage";
import { AuthenticationContext } from "./AuthenticationContext";

interface SessionContextType {
  login: (userData: any) => void
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
  {} as SessionContextType)

export const SessionContextProvider: React.FC = ({ children }) => {

  const { 
    // accessToken, 
    // refreshToken, 
    setAccessToken, 
    setRefreshToken, 
    setIsActiveUser, 
    setLoadingAuthentication, 
    isBiometricAvailable, 
    permissionBiometric 
  } = useContext(AuthenticationContext)

  const [biometricType, setBiometricType] = useState<number | null>(null);

  useEffect(() => {
		(async () => {
			const type = await supportedAuthenticationTypesAsync();
			setBiometricType(parseInt(type?.toString()));
		})();
	}, []);

  async function login(userData: UserDataType): Promise<void> {
		//Loafing the user data from the server
		setLoadingAuthentication(true);
		//Get Access Token
		setAccessToken(userData.loginData.accessToken);
		// saveSecureData("accessToken", userData.loginData.accessToken);
		//Get Refresh Token
		setRefreshToken(userData.loginData.refreshToken);
		// saveSecureData("refreshToken", userData.loginData.refreshToken);
		//Activate the user
		setIsActiveUser(true);

		//Activate biometric authentication
		if (isBiometricAvailable) {
			if (permissionBiometric === undefined || permissionBiometric === null) {
				alertPermissionBiometricAuthentication(
					biometricType,
					JSON.stringify(userData.login),
				);
			}
		}
		await setLoadingAuthentication(false);
	}


  return (
      <SessionContext.Provider value={{login}}>
        {children}
      </SessionContext.Provider>
    )
}

// Activate biometric authentication
const activateBiometricAuth = async (credentials: any) => {
	const result = await authenticateAsync();
	if (result.success) {
		saveDataAsyncStorage("biometricPermission", "true");
		saveEncryptedDataAsyncStorage("authCredentials", credentials);
	} else if (result.error) {}
};

const alertPermissionBiometricAuthentication = (type: any, credentials: any) =>
	Alert.alert(t("authentication.biometric.title"), getType(type), [
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

  const getType = (type: number) => {
    const initType = parseInt(type?.toString());
    const isIos = Platform.OS === "ios" ? true : false;
  
    switch (initType) {
      case 1:
        return isIos
          ? t("authentication.biometric.message-touch-id")
          : t("authentication.biometric.message-fingerprint");
  
      case 2:
        return isIos
          ? t("authentication.biometric.message-face-id")
          : t("authentication.biometric.message-face-recognition");
  
      case 3:
        return t("authentication.biometric.message-iris");
  
      default:
        return t("authentication.biometric.message");
    }
  };