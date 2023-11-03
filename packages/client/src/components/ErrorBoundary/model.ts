import { ReactNode } from 'react'

export interface IBoundaryProps {
  children: ReactNode
}

export interface IErrboundaryState {
  hasError: boolean
  error?: IError
}

export interface IError {
  message: string
  errorStack: string
}
