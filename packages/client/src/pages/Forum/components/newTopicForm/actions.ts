import axios from 'axios'
import { baseURL, forumTopicURL } from '../../../../API/endpoints'

axios.defaults.baseURL = baseURL

const config = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  withCredentials: true,
  timeout: 10000,
}

export const createTopic = async (
  data: Record<string, string>
): Promise<void> =>
  axios({
    ...config,
    method: 'POST',
    url: 'http://localhost:3001/api' + '/forum/topic',
    data: JSON.stringify(data),
  })
