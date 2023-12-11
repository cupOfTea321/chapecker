import { forumCommentsURL } from '../../url'
import type { Express } from 'express'
import { Comment } from '../../database'

export default function getCommentsAPI(app: Express) {
  app.get(forumCommentsURL, async (req, res) => {
    const { limit: limitQ, offset: offsetQ } = req.query
    const { topic_id: topic_idP } = req.params
    try {
      const topic_id = Number(topic_idP)
      if (isNaN(topic_id)) {
        res.status(400).send('Неверный topic_id')
        return
      }
      let limit = Number(limitQ)
      if (isNaN(limit)) limit = 10
      let offset = Number(offsetQ)
      if (isNaN(offset)) offset = 0

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
