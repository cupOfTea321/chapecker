export const baseURL = 'https://chapecker.ya-praktikum.tech/api/v2'
export const sourceURL = 'resources'
export const changeAvatarURL = 'user/profile/avatar'
export const changeProfileURL = 'user/profile'
export const changePasswordURL = 'user/password'
export const siginURL = 'auth/signin'
export const sigupURL = 'auth/signup'
export const userInfoURL = 'auth/user'
export const logoutURL = 'auth/logout'
export const yandexOAuthURL = 'oauth/yandex'

export const getUserById = (id: number) => baseURL + '/user/' + id

export const appURL = 'https://chapecker.ya-praktikum.tech/'
export const forumURL = appURL.concat('forum/')

export const yandexOAuthIdURL = `oauth/yandex/service-id?redirect_uri=${appURL}`

export const serverURL = 'https://chapecker.ya-praktikum.tech/api'
export const proxyURL = baseURL

export const forumBaseURL = serverURL + '/forum'
export const forumTopicURL = serverURL + '/forum/topic'
export const forumTopicsURL = serverURL + '/forum/topics'
export const forumCountTopicsURL = forumBaseURL + '/count/topics'
export const forumCountCommentsURL = forumBaseURL + '/count/comments/'
export const forumCommentURL = serverURL + '/forum/comment'
export const forumCommentsURL = serverURL + '/forum/comments/'
export const forumReplyURL = serverURL + '/forum/reply'
export const forumReplysURL = serverURL + '/forum/replies'
export const commentRepliesCountURL = forumBaseURL + '/count/replies/'
