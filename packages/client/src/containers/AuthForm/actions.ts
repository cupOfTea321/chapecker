import axios from 'axios'
import { baseURL, siginURL, userInfoURL } from '../../API/endpoints'
import { ISigin, ISingInResposponse } from './interfaces'
import { User } from '../../redux/features/userSlice'

axios.defaults.baseURL = baseURL

const config = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  timeout: 10000,
}

export const signIn = async (data: ISigin): Promise<ISingInResposponse> =>
  axios(
    Object.assign(config, {
      method: 'POST',
      url: siginURL,
      withCredentials: true,
      data: JSON.stringify(data),
    })
  )

export const getUserInfo = async (): Promise<{ data: User }> =>
  axios(
    Object.assign(config, {
      method: 'GET',
      withCredentials: true,
      url: userInfoURL,
    })
  )
