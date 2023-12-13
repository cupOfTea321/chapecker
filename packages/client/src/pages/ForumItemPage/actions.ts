import axios from 'axios'
import { forumCommentsURL } from '../../API/endpoints'
import { ITopic } from '../../redux/features/forumSlice'

const config = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  withCredentials: true,
  timeout: 10000,
}

export const getComments = async ({
  id,
  limit,
  offset,
}: {
  id: string
  limit: number
  offset: number
}): Promise<{ data: ITopic }> =>
  axios({
    ...config,
    method: 'GET',
    url: forumCommentsURL + id + '/' + '?limit=' + limit + '&offset=' + offset,
  })
