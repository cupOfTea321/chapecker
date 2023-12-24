import axios from 'axios'
import {
  forumTopicsURL,
  forumCountTopicsURL,
  forumCountCommentsURL,
} from '../../API/endpoints'
import { ITopic } from '../../redux/features/forumSlice'

const config = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  withCredentials: true,
  timeout: 10000,
}

export const createTopic = async (data: {
  limit: number
  offset: number
}): Promise<void> =>
  axios({
    ...config,
    method: 'GET',
    url: forumTopicsURL,
    data: JSON.stringify(data),
  })

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

export const getCommentsCount = async (
  id: number
): Promise<{ data: { count: number } }> =>
  axios({
    ...config,
    method: 'GET',
    url: forumCountCommentsURL + id,
  })
