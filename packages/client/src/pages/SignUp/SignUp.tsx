import React from 'react'
import { AuthForm } from '../../containers/AuthForm'
import { Layout } from '../../containers/Layout'

const SignUp = () => {
  return (
    <Layout>
      <AuthForm>
        <AuthForm.Field type="text" label="First name" />
        <AuthForm.Field type="text" label="Second name" />
        <AuthForm.Field type="text" label="Login" />
        <AuthForm.Field type="email" label="Email" />
        <AuthForm.Field type="password" label="Password" />
        <AuthForm.Field type="tel" label="Phone" />
        <AuthForm.SubmitButton title="Sign up" />
        <AuthForm.Divider text="OR" />
        <AuthForm.RedirectButton title="Go to Login" redirectUrl="/login" />
      </AuthForm>
    </Layout>
  )
}

export default SignUp
