import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../redux/store'
import { getUserData } from '../../redux/selectors'
import { setUserData } from '../../redux/features/userSlice'
import { getUserInfo, postOAuthInfo } from './actions'
import { publilRoutes } from '../../router/router'
import Spinner from '../spinner/Spinner'

const ProtectedRoute = () => {
  const [user, setUser] = useState(useTypedSelector(getUserData))
  const [authStatus, setAuthStatus] = useState(
    user !== null ? 'checked' : 'unchecked'
  )
  const [isLoad, setLoad] = useState(true)
  const dispatch = useAppDispatch()

  const chechAuth = async () => {
    // if there is secret code in query parameters -- it is yandex oauth!
    new Promise((resolve, reject) => {
      if (document.location.search) {
        const params = new URLSearchParams(document.location.search)
        const code = params.get('code')
        if (code) {
          postOAuthInfo(code)
            .then(() => {
              resolve('')
            })
            .catch(err => {
              reject(err)
            })
        } else {
          resolve('')
        }
      } else {
        resolve('')
      }
    })
      .then(() => getUserInfo())
      .then(({ data }) => {
        setUser(data)
        dispatch(setUserData(data))
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoad(false)
        setAuthStatus('checked')
      })
  }

  authStatus !== 'checked' && chechAuth()

  const content = user && <Outlet />
  const redirect = !user && <Navigate to={publilRoutes.login.path} />

  return isLoad ? (
    <Spinner />
  ) : (
    <>
      {content}
      {redirect}
    </>
  )
}

export default ProtectedRoute
