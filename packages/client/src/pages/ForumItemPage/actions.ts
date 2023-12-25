import axios from 'axios'
import {
  forumCommentsURL,
  forumCommentURL,
  forumCountCommentsURL,
} from '../../API/endpoints'
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
  first_name,
  second_name,
  avatar,
}: {
  text: string
  topic_id: string
  first_name: string
  second_name: string
  avatar: string
}) =>
  axios({
    ...config,
    method: 'POST',
    url: forumCommentURL,
    data: JSON.stringify({
      text,
      topic_id,
      first_name,
      second_name,
      avatar,
    }),
  })

export const loadCommentsCount = async (
  id: string
): Promise<{ data: { count: number } }> =>
  axios({
    ...config,
    method: 'GET',
    url: forumCountCommentsURL + id,
  })
