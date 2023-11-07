import React, { createContext } from 'react'
import { AuthContext } from './interfaces'

export const AuthFormContext = createContext<AuthContext>(null)

export const useAuthFormContext = () => {
  const context = React.useContext(AuthFormContext)

  if (!context) {
    throw new Error(
      'This component must be used within a <AuthForm> component.'
    )
  }

  return context
}
