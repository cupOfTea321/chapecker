import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../redux/store'
import { getUserData, isUserLoad } from '../../redux/selectors'
import { setUserData, setError, load } from '../../redux/features/userSlice'
import { getUserInfo, postOAuthInfo } from './actions'
import { publilRoutes } from '../../router/router'
import Spinner from '../spinner/Spinner'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [load, isLoad] = useState(true)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [user, setUser] = useState(useTypedSelector(getUserData))
  const [checkStatus, setChecked] = useState(false)
  const fetchUserData = useCallback(async () => {
    try {
      // if there is secret code in query parameters -- it is yandex oauth!
      if (document && document.location && document.location.search) {
        const params = new URLSearchParams(document.location.search)
        const code = params.get('code')
        if (code) {
          await postOAuthInfo(code)
        }
      }

      const { data } = await getUserInfo()
      dispatch(setUserData(data))
      setUser(data)
    } catch (err) {
      console.log(err)
    } finally {
      isLoad(false)
      setChecked(true)
    }
  }, [user])

  useEffect(() => {
    if (!user && !checkStatus) {
      fetchUserData()
    }
    if (!user && checkStatus) {
      navigate(publilRoutes.login.path)
    }
  }, [user, checkStatus])

  return load ? <Spinner /> : <>{children}</>
}

export default ProtectedRoute
