import { useMutation } from "@apollo/client";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  authenticateAsync,
  supportedAuthenticationTypesAsync,
} from "expo-local-authentication";
import { t } from "i18next";
import React, { useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components";
import { SessionContext } from "../../services/context/SessionContext";
import { LOGIN } from "../../services/graphql/mutation";
import { getDeviceInput } from "../../utils/getDeviceInput";
import {
  getDataAsyncStorage,
  getDataEncryptedAsyncStorage,
} from "../../utils/storage";
import { Btn, LoginButtonContent } from "../styled";

interface BiometricButtonProps {
  whereApp: string;
  setErr: (err: boolean) => void;
  deviceIdentifier: string;
}

export const BiometricButton: React.FC<BiometricButtonProps> = ({
  whereApp,
  setErr,
  deviceIdentifier,
}) => {
  const theme = useTheme();
  const [biometricType, setBiometricType] = useState<number | null>(null);
  const [permission, setPermission] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<string | null>(null);

  const { login } = useContext(SessionContext);
  const [getLogin] = useMutation(LOGIN);

  useEffect(() => {
    (async () => {
      const type = await supportedAuthenticationTypesAsync();
      setBiometricType(parseInt(type?.toString()) || null);

      const permission = await getDataAsyncStorage("biometricPermission");
      setPermission(permission === "true");
      if (permission === "true") {
        const credentials = await getDataEncryptedAsyncStorage("authCredentials");
        setCredentials(credentials);
      }
    })();
  }, []);

  const handleBiometricAuthentication = async () => {
    const result = await authenticateAsync();
    const values = JSON.parse(credentials || "");

    if (result?.success) {
      const deviceInput = await getDeviceInput(deviceIdentifier);
      getLogin({
        update(_, { data: { login: loginData } }) {
          if (loginData?.success) {
            setErr(false);
            const userData = {
              loginData,
              login: values,
            };
            login(userData);
          } else if (loginData?.error) {
            setErr(true);
          }
        },
        variables: {
          email: values.email,
          password: values.password,
          deviceInput,
          whereApp: whereApp,
        },
      });
    }
  };

  return (
    <>
      {permission && (
        <>
          <LoginButtonContent>
            {Platform.OS === "ios" ? (
              <Btn
                icon="camera"
                contentStyle={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
                style={{ justifyContent: "center" }}
                theme={{ roundness: 1 }}
                buttonColor="#fffaebc2"
                textColor={theme.colors.primary}
                onPress={handleBiometricAuthentication}
              >
                {getType(biometricType)}
              </Btn>
            ) : (
              <MaterialCommunityIcons.Button
                name={
                  biometricType === 1
                    ? "fingerprint"
                    : biometricType === 2
                    ? "face-recognition"
                    : "eye"
                }
                backgroundColor={"#fffaebc2"}
                color={theme.colors.primary}
                style={{ height: 45 }}
                onPress={handleBiometricAuthentication}
              >
                {getType(biometricType)}
              </MaterialCommunityIcons.Button>
            )}
          </LoginButtonContent>
        </>
      )}
    </>
  );
};

const getType = (type: number | null): string => {
  const initType = parseInt(type?.toString() || "");
  const isIos = Platform.OS === "ios";

  switch (initType) {
    case 1:
      return isIos
        ? t("authentication.login.touch-id")
        : t("authentication.login.fingerprint");

    case 2:
      return isIos
        ? t("authentication.login.face-id")
        : t("authentication.login.face-recognition");

    case 3:
      return t("authentication.login.iris");

    default:
      return t("authentication.login.biometrics");
  }
};
