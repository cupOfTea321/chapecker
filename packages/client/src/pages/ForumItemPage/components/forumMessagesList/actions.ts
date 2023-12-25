import axios from 'axios'
import { forumReplysURL, forumReplyURL } from '../../../../API/endpoints'

const config = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  withCredentials: true,
  timeout: 10000,
}

export const getReplies = async ({
  id,
  limit,
  offset,
}: {
  id: number
  limit: number
  offset: number
}): Promise<{ data: TReply[] }> =>
  axios({
    ...config,
    method: 'GET',
    url: forumReplysURL + '/' + id + '?limit=' + limit + '&offset=' + offset,
  })

export const sendReply = async ({
  text,
  comment_id,
  first_name,
  second_name,
  avatar,
}: {
  text: string
  comment_id: number
  first_name: string
  second_name: string
  avatar: null | string
}) =>
  axios({
    ...config,
    method: 'POST',
    url: forumReplyURL,
    data: JSON.stringify({ text, comment_id, first_name, second_name, avatar }),
  })

export type TReply = {
  text: string
  creator_id: number
  first_name: string
  second_name: string
  avatar: null | string
  createdAt: string
  reply_id: number
}
