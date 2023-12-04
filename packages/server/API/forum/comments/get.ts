import { forumCommentsURL } from '../../url'
import type { Express } from 'express'
import { Comment } from '../../database'

export default function getCommentsAPI(app: Express) {
  app.get(forumCommentsURL, async (req, res) => {
    const { limit: limitQ, offset: offsetQ } = req.query
    const { topic_id: topic_idP } = req.params
    try {
      const topic_id = Number(topic_idP)
      if (isNaN(topic_id) || typeof topic_id !== 'number') {
        res.status(400).send('Неверный topic_id')
        return
      }
      let limit: number | undefined = Number(limitQ)
      if (isNaN(limit) || typeof limit !== 'number') limit = 10
      let offset: number | undefined = Number(offsetQ)
      if (isNaN(offset) || typeof limit !== 'number') offset = 0

      const comments = await Comment.findAll({
        attributes: ['creator_id', 'text', 'comment_id', 'createdAt'],
        where: { topic_id },
        limit,
        offset,
      })
      res.status(200).send(JSON.stringify(comments))
    } catch (e) {
      console.log(e)
      res.status(400).send('Не получилось выбрать данные из базы данных')
    }
  })
}
