import type { Express } from 'express'
import postTopicAPI from './topics/post'
import getTopicsAPI from './topics/get'
import postCommentAPI from './comments/post'
import getCommentsAPI from './comments/get'
import postReplyAPI from './replies/post'
import getRepliesAPI from './replies/get'

export default function addForumAPI(app: Express) {
  postTopicAPI(app)
  getTopicsAPI(app)

  postCommentAPI(app)
  getCommentsAPI(app)

  postReplyAPI(app)
  getRepliesAPI(app)
}