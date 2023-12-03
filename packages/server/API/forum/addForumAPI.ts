import type { Express } from 'express'
import postTopicAPI from './topics/post'

export default function addForumAPI(app: Express) {
  postTopicAPI(app)
}
