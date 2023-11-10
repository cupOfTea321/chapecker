import { useCallback } from 'react'
import { AuthForm } from '../../containers/AuthForm'
import { Layout } from '../../containers/Layout'
import { useNavigate } from 'react-router-dom'
import { signIn } from './actions'
import { privateRoutes } from '../../router/router'
import { PartialRecord } from '../../containers/AuthForm/interfaces'
import { TFieldNames } from '../../constants/fields'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const defaultFormValues = {
    login: '',
    password: '',
  }

  const onSubmit = useCallback(
    async (fieldData: PartialRecord<TFieldNames, string>) => {
      try {
        await signIn(fieldData)
        navigate(privateRoutes.mainPage.path)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data.reason === 'User already in system')
            navigate(privateRoutes.mainPage.path)
        }
        console.log(err)
      }
    },
    []
  )

  return (
    <Layout>
      <AuthForm onSubmit={onSubmit} defaultFormValues={defaultFormValues}>
        <AuthForm.Field required fieldName="login" />
        <AuthForm.Field required fieldName="password" />
        <AuthForm.SubmitButton title="Login" />
        <AuthForm.Divider text="OR" />
        <AuthForm.RedirectButton title="Go to SIGN UP" redirectUrl="/signup" />
      </AuthForm>
    </Layout>
  )
}

export default Login
