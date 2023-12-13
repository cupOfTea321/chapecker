import axios from 'axios'
import { getUserById } from '../../../../API/endpoints'
import { IUser } from '../../../Profile/model'

const config = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  withCredentials: true,
  timeout: 10000,
}

export const getAuthor = async (id: number): Promise<IUser> =>
  axios({
    ...config,
    method: 'GET',
    url: getUserById(id),
  })
