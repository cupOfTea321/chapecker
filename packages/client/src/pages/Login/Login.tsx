import { useCallback, useEffect } from 'react'
import { AuthForm } from '../../containers/AuthForm'
import { Layout } from '../../containers/Layout'
import { useNavigate } from 'react-router-dom'
import { getYandexOAuthId, signIn } from './actions'
import { privateRoutes } from '../../router/router'
import { PartialRecord } from '../../containers/AuthForm/interfaces'
import { TFieldNames } from '../../constants/fields'
import axios from 'axios'
import './login.scss'
import { useAppDispatch, useTypedSelector } from '../../redux/store'
import { getOAuthId } from '../../redux/selectors'
import { setOAuthServiceId } from '../../redux/features/oauthSlice'
import { appURL } from '../../API/endpoints'
import { useTheme } from '../../utils/useTheme'

const Login = () => {
  const dispatch = useAppDispatch()
  const oauthID = useTypedSelector(getOAuthId)
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

  useEffect(() => {
    // Need to find out the app's id in Yandex OAuth
    const effect = async () => {
      try {
        const { data } = await getYandexOAuthId()
        if ('service_id' in data) {
          dispatch(setOAuthServiceId(data.service_id))
        }
      } catch (e) {
        console.log(e)
      }
    }

    effect()
  }, [])

  return (
    <Layout>
      <AuthForm onSubmit={onSubmit} defaultFormValues={defaultFormValues}>
        <AuthForm.Field required fieldName="login" />
        <AuthForm.Field required fieldName="password" />
        <AuthForm.SubmitButton title="Login" />
        <AuthForm.Divider text="OR" />
        <AuthForm.RedirectButton title="Go to SIGN UP" redirectUrl="/signup" />
        <AuthForm.RedirectButton
          title="Yandex"
          redirectUrl={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${oauthID}&redirect_uri=${appURL}`}
          id="yandex-button"
        />
      </AuthForm>
    </Layout>
  )
}

export default Login
