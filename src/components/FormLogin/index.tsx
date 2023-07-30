import { useMutation } from "@apollo/client";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { t } from "i18next";
import React, { useContext, useState } from 'react';
import { ScrollView, TouchableOpacity } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useTheme } from 'styled-components/native';
import { AuthenticationContext } from '../../services/context/AuthenticationContext';
import { SessionContext } from "../../services/context/SessionContext";
import { LOGIN } from "../../services/graphql/mutation";
import { getDeviceInput } from "../../utils/getDeviceInput";
import { Logo } from "../Logo";
import { Body, FieldContent, FieldsContent, LoginButtonContent } from "../styled";
import { ValidationSchema } from "./ValidationSchema";

interface Props {
  useSocialAuth: boolean;
  whichApp: string;
}

export const FormLogin: React.FC<Props> = ({ useSocialAuth, whichApp }) => {
  const theme = useTheme();
  const { navigate } = useNavigation();
  const [secure, setSecure] = useState<boolean>(true);
  const { deviceIdentifier, isBiometricAvailable } = useContext(
    AuthenticationContext,
  );

  const { login } = useContext(SessionContext);

  const [err, setErr] = useState<boolean>(false); //Error

  const [getLogin, { loading }] = useMutation(LOGIN);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidationSchema(),
    onSubmit: async (values) => {
      console.log(values);

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
      		whereApp: whichApp,
      	},
      });
    },
  });

  return (
    <Body>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Logo />

        <Text variant="titleLarge">{t("authentication.login.login")}</Text>

        <FieldsContent>
          <FieldContent>
            <TextInput
              label={t("authentication.email")}
              style={{ backgroundColor: theme.colors.background }}
              left={<TextInput.Icon icon="at" />}
              autoCapitalize="none"
              autoComplete="email"
              inputMode="email"
              keyboardType="email-address"
              keyboardAppearance={theme.mode}
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              error={
                err || (formik.touched.email && Boolean(formik.errors.email))
              }
            />
            {formik.touched.email && Boolean(formik.errors.email) && (
              <HelperText type="error">{formik.errors.email}</HelperText>
            )}
          </FieldContent>

          <FieldContent>
            <TextInput
              label={t("authentication.password")}
              style={{ backgroundColor: theme.colors.background }}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={secure ? "eye" : "eye-off"}
                  size={20}
                  onPress={() => setSecure(!secure)}
                  forceTextInputFocus={false}
                />
              }
              autoCapitalize="none"
              keyboardAppearance={theme.mode}
              secureTextEntry={secure}
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              error={
                err ||
                (formik.touched.password && Boolean(formik.errors.password))
              }
            />
            {formik.touched.password && Boolean(formik.errors.password) && (
              <HelperText type="error">{formik.errors.password}</HelperText>
            )}
          </FieldContent>
        </FieldsContent>

        <Button
          mode="contained"
          theme={{ roundness: 1 }}
          loading={loading}
          onPress={() => formik.handleSubmit()}
        >
          {t("authentication.login.login")}
        </Button>

        <TouchableOpacity onPress={() => navigate("ForgotPasswordScreen")}>
          <Text
            variant="bodyLarge"
            style={{
              color: theme.colors.primary,
              textAlign: "right",
              marginTop: 2,
            }}
          >
            {t("authentication.login.forgot-password")}
          </Text>
        </TouchableOpacity>

        {useSocialAuth || isBiometricAvailable ? (
          <Text style={{ marginTop: 20, marginBottom: 5, textAlign: "center" }}>
            {t("authentication.login.more")}
          </Text>
        ) : (
          <></>
        )}

        {useSocialAuth && (
          <>
            <LoginButtonContent>
              <FontAwesome.Button
                name="google"
                backgroundColor="#FAE9EA"
                color="#DD4D44"
                style={{ height: 45 }}
                onPress={() => { }}
              >
                {t("authentication.login.google")}
              </FontAwesome.Button>
            </LoginButtonContent>

            <LoginButtonContent>
              <FontAwesome.Button
                name="apple"
                backgroundColor="#E3E3e3"
                color="#363636"
                style={{ height: 45 }}
                onPress={() => { }}
              >
                {t("authentication.login.apple")}
              </FontAwesome.Button>
            </LoginButtonContent>
          </>
        )}

      </ScrollView>
    </Body>
  )
}
