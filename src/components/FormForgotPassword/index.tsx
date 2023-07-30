import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { t } from "i18next";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useTheme } from "styled-components";
import { RECOVER_PASSWORD } from "../../services/graphql/mutation";
import { Logo } from "../Logo";
import {
	Body,
	FieldContent,
	FieldsContent,
	Footer,
	Form,
} from "../styled";
import { ValidationSchema } from "./ValidationSchema";

export const FormForgotPassword = () => {
	const theme = useTheme();
	const { navigate } = useNavigation();

	const [sendEmail, { loading }] = useMutation(RECOVER_PASSWORD);

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: ValidationSchema(),
		onSubmit: async (values) => {
			sendEmail({
				update(_, { data: { forgotPassword } }) {
					if (forgotPassword?.status) {
						Toast.show({
							type: ALERT_TYPE.SUCCESS,
							title: t("success.title"),
							textBody: t("authentication.success.forgot-password"),
						});
					}
				},
				variables: {
					email: values.email,
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
						{t("authentication.forgot-password.forgot-password")}
					</Text>

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
								error={formik.touched.email && Boolean(formik.errors.email)}
							/>
							{formik.touched.email && Boolean(formik.errors.email) && (
								<HelperText type="error">{formik.errors.email}</HelperText>
							)}
						</FieldContent>
					</FieldsContent>

					<Button
						mode="contained"
						theme={{ roundness: 1 }}
						loading={loading}
						onPress={() => formik.handleSubmit()}
					>
						{t("authentication.forgot-password.forgot-password")}
					</Button>
				</Form>

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