import type { Express } from 'express'
import connectToPG from './database'
import addProxyAPI from './proxy/addProxyAPI'
import addForumAPI from './forum/addForumAPI'

export default function addAPI(app: Express) {
  connectToPG()

  addProxyAPI(app)
  addForumAPI(app)
}
