import axios from 'axios'
import { User } from '../../redux/features/userSlice'
import {
  appURL,
  baseURL,
  userInfoURL,
  yandexOAuthURL,
} from '../../API/endpoints'

axios.defaults.baseURL = baseURL

const config = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  timeout: 10000,
}

export const getUserInfo = async (): Promise<{ data: User }> =>
  axios(
    Object.assign(config, {
      method: 'GET',
      withCredentials: true,
      url: userInfoURL,
    })
  )
export const postOAuthInfo = async (code: string): Promise<unknown> =>
  axios(
    Object.assign(config, {
      method: 'POST',
      withCredentials: true,
      url: yandexOAuthURL,
      data: JSON.stringify({
        code,
        redirect_uri: appURL,
      }),
    })
  )
