import { Router } from 'express'
import postTopic from './topics/post'
import getTopics from './topics/get'
import postComment from './comments/post'
import getComments from './comments/get'
import postReply from './replies/post'
import getReplies from './replies/get'
import postEmoji from './emoji/post'
import getEmoji from './emoji/get'
import {
  commentURL,
  commentsURL,
  emojiAddURL,
  emojiURL,
  repliesURL,
  replyURL,
  topicURL,
  topicsURL,
} from './url'

const forumRouter = Router()

forumRouter.get(emojiURL, getEmoji)
forumRouter.post(emojiAddURL, postEmoji)

forumRouter.get(repliesURL, getReplies)
forumRouter.post(replyURL, postReply)

forumRouter.get(topicsURL, getTopics)
forumRouter.post(topicURL, postTopic)

forumRouter.get(commentsURL, getComments)
forumRouter.post(commentURL, postComment)

export default forumRouter
