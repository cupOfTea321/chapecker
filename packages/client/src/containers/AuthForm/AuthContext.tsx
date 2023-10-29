import React, { createContext } from 'react'

type TAuthContext = { [key: string]: unknown } | null

export const AuthFormContext = createContext<TAuthContext>(null)

export const useAuthFormContext = () => {
  const context = React.useContext(AuthFormContext)

  if (!context) {
    throw new Error(
      'This component must be used within a <AuthForm> component.'
    )
  }

  return context
}
