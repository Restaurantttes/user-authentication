import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import React, { useContext, useState } from 'react';
import { ScrollView } from "react-native";
import { useTheme } from 'styled-components/native';
import { AuthenticationContext } from '../../services/context/AuthenticationContext';
import { Logo } from "../Logo";
import { Body } from "../styled";
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

      </ScrollView>
    </Body>
  )
}
