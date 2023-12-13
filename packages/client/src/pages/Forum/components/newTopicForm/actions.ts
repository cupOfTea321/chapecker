import axios from 'axios'
import { forumTopicURL } from '../../../../API/endpoints'

const config = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  withCredentials: true,
  timeout: 10000,
}

export const createTopic = async ({
  title,
  description,
}: {
  [x: string]: unknown
}): Promise<void> =>
  axios({
    ...config,
    method: 'POST',
    url: forumTopicURL,
    data: JSON.stringify({ title, description }),
  })

export interface INewTopic {
  title: string
  description: string
}
