import { t } from "i18next";
import LottieView from "lottie-react-native";
import React from "react";
import { Button, Text } from "react-native-paper";
import { useTheme } from "styled-components";
import { Body } from "./styled";

interface Props {
	error: any;
	refetch: () => void;
}

export const Error500: React.FC<Props> = ({ error, refetch }) => {
	const theme = useTheme();
	console.log(error);
	

	return (
		<Body>
			<LottieView
				autoPlay
				style={{
					width: 300,
					height: 300,
					backgroundColor: "transparent",
				}}
				source={{
					uri: "https://assets5.lottiefiles.com/packages/lf20_8qMJfR.json",
				}}
			/>
			<Text
				variant="titleLarge"
				style={{
					color: theme.colors.error.button,
				}}
			>
				{t("error.500")}
			</Text>
			<Button onPress={() => refetch()}>{t("update")}</Button>
		</Body>
	);
};
