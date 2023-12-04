import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { yandexCoreApi } from '../services/yandexCore'

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export interface IUserState {
  data: null | User
  load: boolean
  error: 'none' | unknown
}

const initialState: IUserState = {
  data: null,
  load: false,
  error: 'none',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const userInfo = action.payload
      state.data = userInfo
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      yandexCoreApi.endpoints.getUser.matchFulfilled,
      (state, action) => {
        // state.user = action.payload
        // state.isAuth = true;
      }
    )
  },
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer

export const getUser = (state: RootState) => state.user.data
