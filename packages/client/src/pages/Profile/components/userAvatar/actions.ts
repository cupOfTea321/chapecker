import axios from 'axios'
import { baseURL, changeAvatarURL } from '../../../../API/endpoints'
import { IUser } from '../../model'

export const changeUserAvatar = async (file: File): Promise<IUser> => {
  const formData = new FormData()
  formData.append('avatar', file)

  return axios({
    method: 'PUT',
    url: baseURL.concat('/', changeAvatarURL),
    timeout: 10000,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'PUT',
    },
    data: formData,
  })
}