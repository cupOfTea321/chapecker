import axios from 'axios'
import { IUser } from './model'
import {
  baseURL,
  changePasswordURL,
  changeProfileURL,
} from '../../API/endpoints'

axios.defaults.baseURL = baseURL

const userFormAxiosConfig = {
  method: 'PUT',
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  withCredentials: true,
  timeout: 10000,
}

export const changeUserInfo = async (newUserInfo: IUser): Promise<IUser> => {
  console.log(JSON.stringify(newUserInfo))
  return axios(
    Object.assign(userFormAxiosConfig, {
      url: changeProfileURL,
      data: JSON.stringify(newUserInfo),
    })
  )
}

export const changePassword = async (newUserInfo: IUser): Promise<IUser> =>
  axios(
    Object.assign(userFormAxiosConfig, {
      url: changePasswordURL,
      data: JSON.stringify(newUserInfo),
    })
  )
