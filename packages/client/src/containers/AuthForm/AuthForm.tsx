import { PropsWithChildren } from 'react'
import { Form } from '../../components/Form'
import { TextField } from '../../components/TextField'
import { Button } from '../../components/Button'
import styles from './AuthForm.module.scss'
import Divider from '@mui/material/Divider'
import { AuthFormContext, useAuthFormContext } from './AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import {
  AuthFormProps,
  FieldProps,
  ISigin,
  RedirectButtonProps,
  SubmitButtonProps,
} from './interfaces'
import { INPUT_TYPES, LABELS } from '../../constants/fields'
import { FIELD_REGEX, FIELD_ERROR_MESSAGES } from '../../constants/validations'
import { getUserInfo, signIn } from './actions'
import { privateRoutes } from '../../router/router'
import { setUserData } from '../../redux/features/userSlice'

const AuthForm = ({
  theme = 'light',
  defaultFormValues,
  children,
}: PropsWithChildren<AuthFormProps>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: defaultFormValues,
  })

  const contextValue = {
    theme,
    control,
    errors,
  }

  const onSubmit = async (fieldData: ISigin) => {
    try {
      await signIn(fieldData)
      const { data } = await getUserInfo()
      await setUserData(data)
      return <Navigate to={privateRoutes.mainPage.path} />
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <header className={styles.header}> Chapecker </header>
      <main className={styles.authContainer}>
        <AuthFormContext.Provider value={contextValue}>
          <Form onSubmit={handleSubmit(onSubmit)}>{children}</Form>
        </AuthFormContext.Provider>
      </main>
    </>
  )
}

AuthForm.Field = ({ fieldName, required }: FieldProps) => {
  const { control, errors } = useAuthFormContext()

  return (
    <>
      <Controller
        control={control}
        name={fieldName}
        rules={{ required: required, pattern: FIELD_REGEX[fieldName] }}
        render={({ field }) => (
          <TextField
            {...field}
            type={INPUT_TYPES[fieldName]}
            label={LABELS[fieldName]}
            fullWidth
            required={required}
            error={!!errors[fieldName]}
          />
        )}
      />

      {errors[fieldName] && (
        <span className={styles.errorMessage}>
          {FIELD_ERROR_MESSAGES[fieldName]}
        </span>
      )}
    </>
  )
}

AuthForm.SubmitButton = function SubmitButton({ title }: SubmitButtonProps) {
  return (
    <Button
      fullWidth
      color="success"
      variant="contained"
      size="large"
      type="submit"
      className={styles.submitButton}>
      {title}
    </Button>
  )
}

AuthForm.RedirectButton = function RedirectButton({
  title,
  redirectUrl,
}: RedirectButtonProps) {
  return (
    <Link style={{ width: '100%' }} to={redirectUrl}>
      <Button
        fullWidth
        color="success"
        variant="outlined"
        size="medium"
        type="button">
        {title}
      </Button>
    </Link>
  )
}

AuthForm.Divider = ({ text }: { text: string }) => (
  <Divider
    className={styles.divider}
    orientation="horizontal"
    light={true}
    sx={{
      '&::before, &::after': {
        borderColor: 'hsla(0,0%,100%,.72)',
      },
    }}
    variant="fullWidth">
    {text}
  </Divider>
)

export default AuthForm
