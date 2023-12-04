import { forumTopicsURL } from './../../url'
import type { Express } from 'express'
import { Topic } from './../../database/'

export default function getTopicsAPI(app: Express) {
  app.get(forumTopicsURL, async (req, res) => {
    const { limit: limitQ, offset: offsetQ } = req.query
    try {
      let limit: number | undefined = Number(limitQ)
      if (isNaN(limit) || typeof limit !== 'number') limit = 10
      let offset: number | undefined = Number(offsetQ)
      if (isNaN(offset) || typeof limit !== 'number') offset = 0
      const topics = await Topic.findAll({
        attributes: ['topic_id', 'title', 'creator_id', 'createdAt'],
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
