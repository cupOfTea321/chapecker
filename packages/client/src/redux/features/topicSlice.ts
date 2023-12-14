import { createSlice } from '@reduxjs/toolkit'

export interface IComment {
  comment_id: number
  text: string
  creator_id: number
  createdAt: string
}

export type TTopics = IComment[]

export interface IInitTopicState {
  comments: 'idle' | IComment[]
  load: boolean
  error: unknown
}

export const topicSlice = createSlice({
  name: 'topic',
  initialState: {
    comments: 'idle',
    load: false,
    error: null,
  } as IInitTopicState,
  reducers: {
    setCommets: (state, { payload }) => {
      state.comments = payload
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
