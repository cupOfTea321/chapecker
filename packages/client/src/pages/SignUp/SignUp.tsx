import React from 'react'
import { AuthForm } from '../../containers/AuthForm'
import { Layout } from '../../containers/Layout'

const SignUp = () => {
  const defaultFormValues = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  }

  return (
    <Layout>
      <AuthForm defaultFormValues={defaultFormValues}>
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
