import React, { createContext, useEffect, useState } from 'react';
import { Loading } from '../../components/UI/Loading';
import { getDeviceIdentifier } from '../../utils/getDeviceIdentifier';
import { isBiometricAuthenticationAvailable } from '../../utils/isBiometricAuthenticationAvailable';

import {
  getDataAsyncStorage,
  getDataEncryptedAsyncStorage,
} from '../../utils/storage';

interface AuthenticationContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isActiveUser: boolean;
  deviceIdentifier: string;
  isBiometricAvailable: boolean;
  permissionBiometric: boolean;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setIsActiveUser: (isActive: boolean) => void;
  setLoadingAuthentication: (isLoading: boolean) => void;
}

export const AuthenticationContext = createContext<AuthenticationContextType>(
  {} as AuthenticationContextType
);

export const AuthenticationContextProvider: React.FC = ({ children }) => {
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [isLoadingAuthentication, setLoadingAuthentication] = useState(false);
  const [deviceIdentifier, setDeviceIdentifier] = useState('');

  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [permissionBiometric, setPermissionBiometric] = useState(false);

  useEffect(() => {
    const initialSetup = async () => {
      const localAuthAvailable = await isBiometricAuthenticationAvailable();
      setIsBiometricAvailable(localAuthAvailable);

      const permission = await getDataAsyncStorage('biometricPermission');
      setPermissionBiometric(permission);

      const tokenAccess = await getDataEncryptedAsyncStorage('accessToken');
      setAccessToken(tokenAccess);

      const tokenRefresh = await getDataEncryptedAsyncStorage('refreshToken');
      setRefreshToken(tokenRefresh);

      setIsActiveUser(!!tokenAccess);

      const identifierDevice = await getDeviceIdentifier();
      setDeviceIdentifier(identifierDevice);

      setIsLoadingInitialData(false);
    };

    initialSetup();
  }, []);

  if (isLoadingInitialData || isLoadingAuthentication) {
    return <Loading />;
  }

  return (
    <AuthenticationContext.Provider
      value={{
        accessToken,
        refreshToken,
        isActiveUser,
        deviceIdentifier,
        isBiometricAvailable,
        permissionBiometric,
        setAccessToken,
        setRefreshToken,
        setIsActiveUser,
        setLoadingAuthentication,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};