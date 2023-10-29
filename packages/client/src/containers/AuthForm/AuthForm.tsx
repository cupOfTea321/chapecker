import React, { PropsWithChildren, useMemo } from 'react'
import { Form } from '../../components/Form'
import { TextField } from '../../components/TextField'
import { Button } from '../../components/Button'
import styles from './AuthForm.module.scss'
import Divider from '@mui/material/Divider'
import { AuthFormContext } from './AuthContext'
import { Link } from 'react-router-dom'

// TODO: для темизации
interface IAuthFormProps {
  theme?: 'light' | 'dark'
}

type FieldProps = {
  label: string
  type: React.InputHTMLAttributes<unknown>['type']
}

type ButtonProps = {
  title: string
}

type SubmitButtonProps = ButtonProps

type RedirectButtonProps = ButtonProps & {
  redirectUrl: string
}

const AuthForm = ({
  theme = 'light',
  children,
}: PropsWithChildren<IAuthFormProps>) => {
  const memoizedContextValue = useMemo(
    () => ({
      theme,
    }),
    [theme]
  )

  return (
    <>
      <header className={styles.header}> Chapecker </header>
      <main className={styles.authContainer}>
        <AuthFormContext.Provider value={memoizedContextValue}>
          <Form
            onSubmit={e => {
              e.preventDefault()
            }}>
            {children}
          </Form>
        </AuthFormContext.Provider>
      </main>
    </>
  )
}

AuthForm.Field = function Field({ label, type }: FieldProps) {
  return <TextField type={type} label={label} fullWidth />
}

AuthForm.SubmitButton = function SubmitButton({ title }: SubmitButtonProps) {
  return (
    <Button
      fullWidth
      color="success"
      variant="contained"
      size="large"
      type="submit"
      style={{
        marginTop: '3rem',
        height: '3.5rem',
        backgroundColor: '#81b64c',
        color: 'hsla(0, 0%, 100%, 0.72)',
      }}>
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
    style={{
      width: '100%',
      color: 'hsla(0,0%,100%,.72)',
      fontSize: '14px',
      margin: '1rem 0',
    }}
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
