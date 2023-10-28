import axios from 'axios'
import { IUser } from './model'
import {
  changePasswordEndpoint,
  changeProfileEndpoint,
} from '../../API/endpoints'

export const changeUserInfo = async (newUserInfo: IUser): Promise<IUser> =>
  axios({
    method: 'PUT',
    url: changeProfileEndpoint,
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    data: JSON.stringify(newUserInfo),
    timeout: 10000,
  })

export const changePassword = async (newUserInfo: IUser): Promise<IUser> =>
  axios({
    method: 'PUT',
    url: changePasswordEndpoint,
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    data: JSON.stringify(newUserInfo),
    timeout: 10000,
  })
