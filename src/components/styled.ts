import { Button } from "react-native-paper";
import styled from "styled-components/native";

export const Body = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Form = styled.View`
  margin-top: -40px;
`;

export const FieldsContent = styled.View`
  width: 100%;
  margin: 10px 0;
`;

export const FieldContent = styled.View`
  width: 100%;
  margin-bottom: 5px;
`;

export const LoginButtonContent = styled.View`
  width: 100%;
  margin-top: 15PX;
`;

export const Footer = styled.View`
  width: 100%;
  margin-top: 40px;
  align-items: center;
`;

export const Btn = styled(Button)`
  height: 45px;
`;