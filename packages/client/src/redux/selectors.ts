import { RootState } from './store'

export const getUserData = (state: RootState) => state.user.data
export const getOAuthId = (state: RootState) => state.oauthservice.service_id
