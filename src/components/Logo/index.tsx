import React from 'react'
import { ContentLogo, LogoImage } from './styled'

export const Logo = () => {
  return (
    <ContentLogo>
      <LogoImage
        source={{ uri: "https://i.postimg.cc/8PcSGNSf/adaptive-icon.png" }}
        transition={0}
      />
    </ContentLogo>
  )
}
