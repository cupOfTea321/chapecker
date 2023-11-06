import { AuthForm } from '../../containers/AuthForm'
import { Layout } from '../../containers/Layout'

const Login = () => {
  const defaultFormValues = {
    login: '',
    password: '',
  }

  return (
    <Layout>
      <AuthForm defaultFormValues={defaultFormValues}>
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
