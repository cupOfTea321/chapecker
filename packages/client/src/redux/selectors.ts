import { RootState } from './store'

export const getUserData = (state: RootState) => state.user.data
export const getForumData = (state: RootState) => state.forum.topics
export const isForumDataLoad = (state: RootState) => state.forum.load
export const getTopicData = (state: RootState) => state.topic.comments
export const isTopicDataLoad = (state: RootState) => state.topic.load
export const getOAuthId = (state: RootState) => state.oauthservice.service_id
