import ErrorPage from './../ErrorPage/ErrorPage'
import errors from './../errors'

const Error500 = () => {
  return <ErrorPage error={errors[500]} />
}

export default Error500
