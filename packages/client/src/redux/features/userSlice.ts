import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { yandexCoreApi } from '../services/yandexCore'
import { getUserInfo } from '../../components/ProtectedRoute/actions'

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
  user: User | null
  data: null | User
  load: boolean
  error: 'none' | unknown
}

const initialState: IUserState = {
  user: null,
  data: null,
  load: false,
  error: 'none',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (
      state,
      { payload: { user } }: PayloadAction<{ user: User }>
    ) => {
      // const userInfo = action.payload
      console.log(user)
      const data = getUserInfo()
      console.log(data)
      state.user = data.data
      console.log(state.user)
      // state.user.data = user
      // state.token = token
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      yandexCoreApi.endpoints.getUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload
        // state.isAuth = true;
      }
    )
  },
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer

export const getUser = (state: RootState) => state.user
