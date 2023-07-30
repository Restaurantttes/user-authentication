import { useMutation } from "@apollo/client";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { t } from "i18next";
import React, { useContext, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useTheme } from "styled-components";
import { AuthenticationContext } from "../../services/context/AuthenticationContext";
import { SessionContext } from "../../services/context/SessionContext";
import { SIGNUP } from "../../services/graphql/mutation";
import { getDeviceInput } from "../../utils/getDeviceInput";
import { Logo } from "../Logo";
import {
  Body,
  FieldContent,
  FieldsContent,
  Footer,
  Form,
  LoginButtonContent,
} from "../styled";
import { ValidationSchema } from "./ValidationSchema";

interface Props {
  useSocialAuth: boolean;
  whichApp: string;
}

export const FormRegister: React.FC<Props> = ({ useSocialAuth, whichApp }) => {
  const theme = useTheme();
  const { navigate } = useNavigation();
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [errors, setErrors] = useState(null);

  const { deviceIdentifier } = useContext(AuthenticationContext);

  const { login } = useContext(SessionContext);

  const [signUp, { loading }] = useMutation(SIGNUP);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: ValidationSchema(),
    onSubmit: async (values) => {
      const name = values.name.split(" ");
      const deviceInput = await getDeviceInput(deviceIdentifier);

      signUp({
        update(_, { data: { register } }) {
          if (register.errors) {
            setErrors(JSON.parse(JSON.parse(register.errors)));
          } else {
            setErrors(null);

            const userData = {
              loginData: register,
              login: {
                email: values.email,
                password: values.password,
              },
            };

            login(userData);
          }
        },
        variables: {
          firstName: name[0],
          lastName: name[1],
          email: values.email,
          password: values.password,
          password2: values.password2,
          deviceInput,
          role: whichApp,
        },
      });
    },
  });

  return (
    <Body>
      <ScrollView>

        <Logo />

        <Form>
          <Text variant="titleLarge">
            {t("authentication.register.register")}
          </Text>

          <FieldsContent>
            <FieldContent>
              <TextInput
                label={t("authentication.full-name")}
                placeholder={t("authentication.placeholder.full-name")}
                style={{ backgroundColor: theme.colors.background }}
                left={<TextInput.Icon icon="account" />}
                autoCapitalize="words"
                keyboardAppearance={theme.mode}
                value={formik.values.name}
                onChangeText={formik.handleChange("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
              {formik.touched.name && Boolean(formik.errors.name) && (
                <HelperText type="error">{formik.errors.name}</HelperText>
              )}
            </FieldContent>

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
                  errors?.email.code === "unique"
                    ? true
                    : formik.touched.email && Boolean(formik.errors.email)
                }
              />
              {errors?.email.code === "unique" ? (
                <HelperText type="error">
                  {t("authentication.error.email-exist")}
                </HelperText>
              ) : (
                formik.touched.email &&
                Boolean(formik.errors.email) && (
                  <HelperText type="error">{formik.errors.email}</HelperText>
                )
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
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />
              {formik.touched.password && Boolean(formik.errors.password) && (
                <HelperText type="error">{formik.errors.password}</HelperText>
              )}
            </FieldContent>

            <FieldContent>
              <TextInput
                label={t("authentication.confirm-password")}
                style={{ backgroundColor: theme.colors.background }}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={secureConfirm ? "eye" : "eye-off"}
                    size={20}
                    onPress={() => setSecureConfirm(!secureConfirm)}
                    forceTextInputFocus={false}
                  />
                }
                autoCapitalize="none"
                keyboardAppearance={theme.mode}
                secureTextEntry={secure}
                value={formik.values.password2}
                onChangeText={formik.handleChange("password2")}
                error={
                  formik.touched.password2 && Boolean(formik.errors.password2)
                }
              />
              {formik.touched.password2 && Boolean(formik.errors.password2) && (
                <HelperText type="error">{formik.errors.password2}</HelperText>
              )}
            </FieldContent>
          </FieldsContent>

          <Button
            mode="contained"
            theme={{ roundness: 1 }}
            loading={loading}
            onPress={() => formik.handleSubmit}
          >
            {t("authentication.login.login")}
          </Button>
        </Form>

        {useSocialAuth && (
          <>
            <Text
              style={{ marginTop: 20, marginBottom: 5, textAlign: "center" }}
            >
              {t("authentication.register.more")}
            </Text>

            <LoginButtonContent>
              <FontAwesome.Button
                name="google"
                backgroundColor="#FAE9EA"
                color="#DD4D44"
                style={{ height: 45 }}
                onPress={() => { }}
              >
                {t("authentication.register.google")}
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
                {t("authentication.register.apple")}
              </FontAwesome.Button>
            </LoginButtonContent>
          </>
        )}

        <Footer>
          <TouchableOpacity onPress={() => navigate("LoginScreen")}>
            <Text variant="bodyLarge">
              {t("authentication.have-account")}{" "}
              <Text style={{ color: theme.colors.primary, fontWeight: 600 }}>
                {t("authentication.login.login")}
              </Text>
            </Text>
          </TouchableOpacity>
        </Footer>
      </ScrollView>
    </Body>
  );
};