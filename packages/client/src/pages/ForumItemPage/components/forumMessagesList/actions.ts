import axios from 'axios'
import {
  getUserById,
  forumReplysURL,
  forumReplyURL,
} from '../../../../API/endpoints'
import { IUser } from '../../../Profile/model'

const config = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  withCredentials: true,
  timeout: 10000,
}

export const getAuthor = async (id: number): Promise<{ data: IUser }> =>
  axios({
    ...config,
    method: 'GET',
    url: getUserById(id),
  })

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
}: {
  text: string
  comment_id: number
}) =>
  axios({
    ...config,
    method: 'POST',
    url: forumReplyURL,
    data: JSON.stringify({ text, comment_id }),
  })

export type TReply = {
  text: string
  creator_id: number
  createdAt: string
  reply_id: number
}

export const getTime = (time: Date) => {
  return (
    time.getFullYear() +
    '-' +
    Number(time.getMonth() + 1) +
    '-' +
    time.getDate() +
    ' at ' +
    time.getHours() +
    ':' +
    time.getMinutes()
  )
}
