import { Image } from 'expo-image';
import styled from "styled-components/native";
import { useWidth } from '../../utils/useWidth';

export const ContentLogo = styled.View`
  width: 100%;
  align-items: center;
  margin-top: -50px;
`;

interface SizeProps {
  $w: number;
}

export const LogoImage = styled(Image) <SizeProps>`
  width: ${(props) => useWidth(props.$w, '70%', '70%', '60%', '50%', '40%')};
  aspect-ratio: 1;
`;