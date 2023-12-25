import { createSlice } from '@reduxjs/toolkit'

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
  comments: 'idle' | IComment[]
  commentsCount: number
  load: boolean
  error: unknown
}

export const topicSlice = createSlice({
  name: 'topic',
  initialState: {
    comments: 'idle',
    commentsCount: 0,
    load: false,
    error: null,
  } as IInitTopicState,
  reducers: {
    setCommets: (state, { payload }) => {
      state.comments = payload.comments
      state.commentsCount = payload.commentsCount
    },
    reload: state => {
      state.comments = 'idle'
    },
    load: (state, { payload }) => {
      state.load = payload
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
  },
})

export const { load, setCommets, reload, setError } = topicSlice.actions

export default topicSlice.reducer
