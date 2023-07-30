import React from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import { useTheme } from 'styled-components'
import { Body } from './styled'

export const Loading = () => {
  const theme = useTheme()

  return (
    <Body>
      <ActivityIndicator size='large' color={Platform.OS === 'android' && theme.colors.primary} />
    </Body>
  )
}