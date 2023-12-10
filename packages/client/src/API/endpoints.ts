export const baseURL = 'http://localhost:3001/api/v2'
export const sourceURL = 'resources'
export const changeAvatarURL = 'user/profile/avatar'
export const changeProfileURL = 'user/profile'
export const changePasswordURL = 'user/password'
export const siginURL = 'auth/signin'
export const sigupURL = 'auth/signup'
export const userInfoURL = 'auth/user'
export const logoutURL = 'auth/logout'
export const yandexOAuthURL = 'oauth/yandex'

export const appURL = 'http://localhost:3000/'
export const yandexOAuthIdURL = `oauth/yandex/service-id?redirect_uri=${appURL}` // redirect to localhost [TEMPORARILY]

export const serverURL = 'http://localhost:3001/api'
export const proxyURL = baseURL

export const forumBaseURL = baseURL + '/forum'
export const forumTopicURL = baseURL + '/forum/topic'
export const forumTopicsURL = baseURL + '/forum/topics'
export const forumCommentURL = baseURL + '/forum/comment'
export const forumCommentsURL = baseURL + '/forum/comments/:topic_id'
export const forumReplyURL = baseURL + '/forum/reply'
export const forumReplysURL = baseURL + '/forum/replies/:comment_id'
