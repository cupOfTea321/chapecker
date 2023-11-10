import axios from 'axios'
import { User } from '../../redux/features/userSlice'
import { baseURL, userInfoURL } from '../../API/endpoints'

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
