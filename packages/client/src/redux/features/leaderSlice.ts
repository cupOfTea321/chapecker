import { createSlice } from '@reduxjs/toolkit'

interface Data {
  myField: string
  otherField: number
}
export interface ILeaderState {
  data: null | Data
  ratingFieldName: string
}

const initialState: ILeaderState = {
  data: {
    myField: 'lol',
    otherField: 23,
  },
  ratingFieldName: 'otherField',
}
export const leaderSlice = createSlice({
  name: 'leader',
  initialState,
  reducers: {
    setEndResult: (state, action) => {
      const userInfo = action.payload
      state.data = userInfo
    },
    getLeaders: () => initialState,
  },
})
