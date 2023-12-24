import { createSlice } from '@reduxjs/toolkit'

export interface ITopic {
  topic_id: number
  title: string
  creator_id: number
  description: string
  createdAt: string
}

export type TTopics = ITopic[]

export type TForumInitialState = {
  topics: 'idle' | TTopics
  topicsCount: number
  load: boolean
  error: unknown
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState: {
    topics: 'idle',
    topicsCount: 0,
    load: false,
    error: null,
  } as TForumInitialState,
  reducers: {
    setTopics: (state, { payload }) => {
      state.topics = payload.topics
      state.topicsCount = payload.topicsCount
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
