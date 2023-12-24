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
  countCommentsURL,
  countEmojiURL,
  countRepliesURL,
  countTopicsURL,
  emojiAddURL,
  emojiURL,
  repliesURL,
  replyURL,
  topicURL,
  topicsURL,
} from './url'
import { countComments, countEmoji, countReplies, countTopics } from './count'

const forumRouter = Router()

forumRouter.get(emojiURL, getEmoji)
forumRouter.post(emojiAddURL, postEmoji)

forumRouter.get(repliesURL, getReplies)
forumRouter.post(replyURL, postReply)

forumRouter.get(topicsURL, getTopics)
forumRouter.post(topicURL, postTopic)

forumRouter.get(commentsURL, getComments)
forumRouter.post(commentURL, postComment)

forumRouter.get(countEmojiURL, countEmoji)
forumRouter.get(countTopicsURL, countTopics)
forumRouter.get(countRepliesURL, countReplies)
forumRouter.get(countCommentsURL, countComments)

export default forumRouter
