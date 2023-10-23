import { ReactNode } from 'react'

export interface IBoundaryProps {
  children: ReactNode
  isPage?: boolean | false
  errorDeploy?: boolean | false
}

export interface IErrboundaryState {
  hasError: boolean
  error?: IError
}

export interface IError {
  message: string
  errorStack: string
}
