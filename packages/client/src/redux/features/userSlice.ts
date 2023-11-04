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
const initialState = {
  data: null,
  isLoading: false,
  error: null,
} as { data: null | User; isLoading: boolean | null; error: string | null }
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: () => {
      return initialState
    },
  },
})

export const { getUser } = userSlice.actions

export default userSlice.reducer
