import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { t } from "i18next";
import React, { useContext, useState } from 'react';
import { ScrollView } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { useTheme } from 'styled-components/native';
import { AuthenticationContext } from '../../services/context/AuthenticationContext';
import { Logo } from "../Logo";
import { Body, FieldContent } from "../styled";
import { ValidationSchema } from "./ValidationSchema";

export const FormLogin = () => {
  const theme = useTheme();
  const { navigate } = useNavigation();
  const [secure, setSecure] = useState<boolean>(true);
  const { deviceIdentifier, isBiometricAvailable } = useContext(
    AuthenticationContext,
  );

  const [err, setErr] = useState<boolean>(false); //Error

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidationSchema(),
    onSubmit: async (values) => {
      console.log(values);

      // const deviceInput = await getDeviceInput(deviceIdentifier);

      // getLogin({
      // 	update(_, { data: { login: loginData } }) {
      // 		if (loginData?.success) {
      // 			setErr(false);
      // 			const userData = {
      // 				loginData,
      // 				login: values,
      // 			};
      // 			login(userData);
      // 		} else if (loginData?.error) {
      // 			setErr(true);
      // 		}
      // 	},
      // 	variables: {
      // 		email: values.email,
      // 		password: values.password,
      // 		deviceInput,
      // 		whereApp: whereApp,
      // 	},
      // });
    },
  });

  return (
    <Body>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Logo />

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

      </ScrollView>
    </Body>
  )
}
