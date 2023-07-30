import LottieView from "lottie-react-native";
import React from 'react';
import { Text } from 'react-native-paper';
import { Body } from './styled';

interface Props {
  customAnimation?: string;
  text: string;
}

export const Empty: React.FC<Props> = ({ customAnimation, text }) => {
  return (
    <Body>
      <LottieView
        autoPlay
        loop={true}
        style={{
          width: "100%",
          height: 250,
          backgroundColor: "transparent",
        }}
        source={{
          uri: customAnimation
            ? customAnimation
            : "https://assets4.lottiefiles.com/private_files/lf30_rrpywigs.json",
        }}
      />
      <Text variant="titleLarge" style={{ textAlign: "center" }}>
        {text}
      </Text>
    </Body>
  )
}
