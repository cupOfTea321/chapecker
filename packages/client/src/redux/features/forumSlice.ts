import { createSlice } from '@reduxjs/toolkit'

export interface ITopic {
  topic_id: number
  title: string
  creator_id: number
  createdAt: string
}

export type TTopics = ITopic[]

export const forumSlice = createSlice({
  name: 'forum',
  initialState: { topics: 'idle', load: false, error: null },
  reducers: {
    setTopics: (state, { payload }) => {
      state.topics = payload
    },
    reload: state => {
      state.topics = 'idle'
    },
    load: (state, { payload }) => {
      state.load = payload
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
  },
})

export const { load, setTopics, reload, setError } = forumSlice.actions

export default forumSlice.reducer
