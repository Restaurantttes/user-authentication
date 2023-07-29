import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Body } from './styled'

export const Loading = () => {
  return (
    <Body>
      <ActivityIndicator size='large' />
    </Body>
  )
}