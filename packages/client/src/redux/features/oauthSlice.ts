import { createSlice } from '@reduxjs/toolkit'

export interface IOAuthService {
  service_id: string | null
}

const initialState: IOAuthService = {
  service_id: null,
}

export const oauthSlice = createSlice({
  name: 'oauthservice',
  initialState,
  reducers: {
    setOAuthServiceId: (state, action) => {
      const serverId = action.payload
      state.service_id = serverId
    },
  },
})

export const { setOAuthServiceId } = oauthSlice.actions

export default oauthSlice.reducer
