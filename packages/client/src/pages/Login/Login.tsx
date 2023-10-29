import React from 'react'
import { AuthForm } from '../../containers/AuthForm'
import { Layout } from '../../containers/Layout'

const Login = () => {
  return (
    <Layout>
      <AuthForm>
        <AuthForm.Field type="text" label="login" />
        <AuthForm.Field type="password" label="password" />
        <AuthForm.SubmitButton title="Login" />
        <AuthForm.Divider text="OR" />
        <AuthForm.RedirectButton title="Go to SIGN UP" redirectUrl="/signup" />
      </AuthForm>
    </Layout>
  )
}

export default Login
