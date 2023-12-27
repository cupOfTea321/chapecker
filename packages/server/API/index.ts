import type { Express } from 'express'
import connectToPG from './database'
import addProxyAPI from './proxy/addProxyAPI'
import forumRouter from './forum/addForumAPI'
import { forumBaseURL } from './url'

export default function addAPI(app: Express) {
  connectToPG()

  addProxyAPI(app)
  app.use(forumBaseURL, forumRouter)
}
