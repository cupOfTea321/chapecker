import { createSlice } from '@reduxjs/toolkit'

export interface ITopic {
  topic_id: number
  title: string
  creator_id: number
  createdAt: string
}

export type TTopics = ITopic[]

export const topicSlice = createSlice({
  name: 'topic',
  initialState: { comments: 'idle', load: false, error: null },
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
