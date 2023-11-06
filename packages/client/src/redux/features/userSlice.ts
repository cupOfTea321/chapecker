import { createSlice } from '@reduxjs/toolkit'

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
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer
