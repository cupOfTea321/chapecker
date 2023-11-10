import { useCallback } from 'react'
import { AuthForm } from '../../containers/AuthForm'
import { Layout } from '../../containers/Layout'
import { PartialRecord } from '../../containers/AuthForm/interfaces'
import { TFieldNames } from '../../constants/fields'
import { signUp } from './actions'
import { useNavigate } from 'react-router-dom'
import { privateRoutes } from '../../router/router'
import axios from 'axios'
import { getUserInfo } from '../../components/ProtectedRoute/actions'
import { setUserData } from '../../redux/features/userSlice'

const SignUp = () => {
  const navigate = useNavigate()
  const defaultFormValues = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  }

  const onSubmit = useCallback(
    async (fieldData: PartialRecord<TFieldNames, string>) => {
      try {
        await signUp(fieldData)
        const data = await getUserInfo()
        setUserData(data)
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
      <AuthForm defaultFormValues={defaultFormValues} onSubmit={onSubmit}>
        <AuthForm.Field required fieldName="first_name" />
        <AuthForm.Field required fieldName="second_name" />
        <AuthForm.Field required fieldName="login" />
        <AuthForm.Field required fieldName="email" />
        <AuthForm.Field required fieldName="password" />
        <AuthForm.Field required fieldName="phone" />
        <AuthForm.SubmitButton title="Sign up" />
        <AuthForm.Divider text="OR" />
        <AuthForm.RedirectButton title="Go to Login" redirectUrl="/login" />
      </AuthForm>
    </Layout>
  )
}

export default SignUp
