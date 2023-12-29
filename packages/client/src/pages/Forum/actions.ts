import axios from 'axios'
import {
  forumTopicsURL,
  forumCountTopicsURL,
  forumTopicURL,
} from '../../API/endpoints'
import { ITopic } from '../../redux/features/forumSlice'

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

export const getTopics = async ({
  limit,
  offset,
}: {
  limit: number
  offset: number
}): Promise<{ data: ITopic[] }> =>
  axios({
    ...config,
    method: 'GET',
    url: forumTopicsURL + '?limit=' + limit + '&offset=' + offset,
  })

export const getTopicsCount = async (): Promise<{ data: { count: number } }> =>
  axios({
    ...config,
    method: 'GET',
    url: forumCountTopicsURL,
  })
