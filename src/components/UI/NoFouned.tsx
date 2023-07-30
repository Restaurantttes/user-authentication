import LottieView from "lottie-react-native";
import React from 'react';
import { Text } from 'react-native-paper';
import { Body } from './styled';

interface Props {
  text: string;
}

export const NoFouned: React.FC<Props> = ({ text }) => {
  return (
    <Body>
      <LottieView
        autoPlay
        loop={false}
        style={{
          width: "100%",
          height: 250,
          backgroundColor: "transparent",
        }}
        source={{
          uri: "https://assets9.lottiefiles.com/packages/lf20_dmw3t0vg.json",
        }}
      />
      <Text variant="titleLarge" style={{ textAlign: "center" }}>
        {text}
      </Text>
    </Body>
  )
}
