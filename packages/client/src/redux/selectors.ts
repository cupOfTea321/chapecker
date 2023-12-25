import { IUser } from '../pages/Profile/model'
import { RootState } from './store'

export const getUserData = (state: RootState): IUser | null => state.user.data
export const getForumData = (state: RootState) => state.forum.topics
export const getTopicsCounts = (state: RootState) => state.forum.topicsCount
export const isForumDataLoad = (state: RootState) => state.forum.load
export const getTopicData = (state: RootState) => state.topic.comments
export const selectTopicTitle = (state: RootState) => state.topic.title
export const selectTopicDescription = (state: RootState) =>
  state.topic.discription
export const getCommentsCount = (state: RootState) => state.topic.commentsCount
export const isTopicDataLoad = (state: RootState) => state.topic.load
export const getOAuthId = (state: RootState) => state.oauthservice.service_id
