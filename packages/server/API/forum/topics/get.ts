import { forumTopicsURL } from './../../url'
import type { Express } from 'express'
import { Topic } from './../../database/'

export default function getTopicsAPI(app: Express) {
  app.get(forumTopicsURL, async (req, res) => {
    const { limit: limitQ, offset: offsetQ } = req.query
    try {
      let limit = Number(limitQ)
      if (isNaN(limit)) limit = 10
      let offset = Number(offsetQ)
      if (isNaN(offset)) offset = 0
      const topics = await Topic.findAll({
        attributes: [
          'topic_id',
          'title',
          'creator_id',
          'createdAt',
          'description',
        ],
        limit,
        offset,
      })
      res.status(200).send(JSON.stringify(topics))
    } catch (e) {
      console.log(e)
      res.status(400).send('Не получилось выбрать данные из базы данных')
    }
  })
}
