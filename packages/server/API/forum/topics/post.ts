import { getUserId } from './../../cookies'
import { forumTopicURL } from './../../url'
import type { Express } from 'express'
import { Topic } from './../../database/'

export default function postTopicAPI(app: Express) {
  app.post(forumTopicURL, async (req, res) => {
    const creator_id = await getUserId(req)
    if (!creator_id) {
      res.status(401).send('')
      return
    }
    const { title } = req.body
    if (!title) {
      res.status(400).send('Не указано название топика')
      return
    }
    let { description } = req.body
    if (!description) description = ''
    try {
      await Topic.create({
        creator_id,
        title,
        description,
      })
      res.status(201).send('OK')
    } catch (e) {
      console.log(e)
      res.status(400).send('Не получилось создать запись в базе данных')
    }
  })
}
