import axios from 'axios'
import { baseURL, siginURL, yandexOAuthIdURL } from '../../API/endpoints'
import { TFieldNames } from '../../constants/fields'
import { PartialRecord } from '../../containers/AuthForm/interfaces'

axios.defaults.baseURL = baseURL

const config = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  withCredentials: true,
  timeout: 10000,
}

export const signIn = async (
  data: PartialRecord<TFieldNames, string>
): Promise<void> =>
  axios(
    Object.assign(config, {
      method: 'POST',
      url: siginURL,
      data: JSON.stringify(data),
    })
  )

export const getYandexOAuthId = async (): Promise<{
  data: { service_id: string }
}> =>
  axios(
    Object.assign(config, {
      method: 'GET',
      url: yandexOAuthIdURL,
    })
  )
