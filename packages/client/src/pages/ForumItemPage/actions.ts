import axios from 'axios'
import { forumCommentsURL, forumCommentURL } from '../../API/endpoints'
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

export const sendComment = async ({
  text,
  topic_id,
}: {
  text: string
  topic_id: string
}) =>
  axios({
    ...config,
    method: 'POST',
    url: forumCommentURL,
    data: JSON.stringify({ text, topic_id }),
  })
