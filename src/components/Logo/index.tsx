import React from 'react'
import { useWindowDimensions } from 'react-native'
import { ContentLogo, LogoImage } from './styled'

export const Logo = () => {
  const { width } = useWindowDimensions()

  return (
    <ContentLogo>
      <LogoImage
        $w={width}
        source={{ uri: "https://i.postimg.cc/8PcSGNSf/adaptive-icon.png" }}
        transition={0}
      />
    </ContentLogo>
  )
}
