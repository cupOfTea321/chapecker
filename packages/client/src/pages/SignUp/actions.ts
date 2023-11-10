import axios from 'axios'
import { baseURL, sigupURL } from '../../API/endpoints'
import { TFieldNames } from '../../constants/fields'
import { PartialRecord } from '../../containers/AuthForm/interfaces'

axios.defaults.baseURL = baseURL

const config = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  withCredentials: true,
  timeout: 10000,
}

export const signUp = async (
  data: PartialRecord<TFieldNames, string>
): Promise<void> =>
  axios(
    Object.assign(config, {
      method: 'POST',
      url: sigupURL,
      data: JSON.stringify(data),
    })
  )
