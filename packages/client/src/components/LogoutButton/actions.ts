import axios from 'axios'
import { logoutURL } from '../../API/endpoints'

export const logOut = async () =>
  axios({
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    withCredentials: true,
    timeout: 10000,
    method: 'POST',
    url: logoutURL,
  })
