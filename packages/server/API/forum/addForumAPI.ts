import type { Express } from 'express'
import connectToPG from './database'

//@ts-ignore
export default function addForumAPI(app: Express) {
  connectToPG()
}
