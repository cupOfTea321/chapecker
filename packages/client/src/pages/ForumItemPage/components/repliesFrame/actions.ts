import axios from 'axios'
import { commentRepliesCountURL } from '../../../../API/endpoints'

const config = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  withCredentials: true,
  timeout: 10000,
}

export const loadRepliesCount = async (
  id: number
): Promise<{ data: { count: number } }> =>
  axios({
    ...config,
    method: 'GET',
    url: commentRepliesCountURL + id,
  })
