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
interface IState {
  data: null | User
  isLoading: boolean | null
  error: string | null
}
const initialState: IState = {
  data: null,
  isLoading: false,
  error: null,
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: state => {
      return state.data
    },
  },
})

export const { getUser } = userSlice.actions

export default userSlice.reducer
