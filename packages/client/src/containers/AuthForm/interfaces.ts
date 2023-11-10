import { Control } from 'react-hook-form/dist/types/form'
import { FieldErrors } from 'react-hook-form/dist/types/errors'
import { TFieldNames } from '../../constants/fields'

export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}

export interface AuthFormProps {
  // TODO: для темизации
  theme?: 'light' | 'dark'
  defaultFormValues: PartialRecord<TFieldNames, string>
  onSubmit: (
    args: PartialRecord<TFieldNames, string>
  ) => Promise<void | undefined>
}

export type FieldProps = {
  fieldName: TFieldNames
  required?: boolean
}

export type ButtonProps = {
  title: string
}

export type SubmitButtonProps = ButtonProps

export type RedirectButtonProps = ButtonProps & {
  redirectUrl: string
}

export type AuthContext = {
  theme?: string
  control: Control
  errors: FieldErrors<PartialRecord<TFieldNames, string>>
} | null
