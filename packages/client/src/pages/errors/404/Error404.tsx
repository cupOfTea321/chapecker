import ErrorPage from './../ErrorPage/ErrorPage'
import errors from './../errors'

const Error404 = () => {
  return <ErrorPage error={errors[404]} />
}

export default Error404
