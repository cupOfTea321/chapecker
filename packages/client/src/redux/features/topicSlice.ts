import { createSlice } from '@reduxjs/toolkit'
import { IDLE } from '../../constants/forumConstants'

export interface IComment {
  comment_id: number
  text: string
  first_name: string
  second_name: string
  avatar: null | string
  creator_id: number
  createdAt: string
}

export type TTopics = IComment[]

export interface IInitTopicState {
  comments: typeof IDLE | IComment[]
  commentsCount: number
  title: null | string
  discription: null | string
  load: boolean
  error: unknown
}

export const topicSlice = createSlice({
  name: 'topic',
  initialState: {
    comments: IDLE,
    commentsCount: 0,
    title: null,
    discription: null,
    load: false,
    error: null,
  } as IInitTopicState,
  reducers: {
    setCommets: (state, { payload }) => {
      state.comments = payload.comments
      state.commentsCount = payload.commentsCount
    },
    setTitleAndDescription: (state, { payload }) => {
      state.title = payload.title
      state.discription = payload.discription
    },
    reload: state => {
      state.comments = IDLE
    },
    load: (state, { payload }) => {
      state.load = payload
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
  },
})

export const { load, setCommets, setTitleAndDescription, reload, setError } =
  topicSlice.actions

export default topicSlice.reducer
