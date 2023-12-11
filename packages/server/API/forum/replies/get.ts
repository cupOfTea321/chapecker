import { forumReplysURL } from '../../url'
import type { Express } from 'express'
import { Reply } from '../../database'

export default function getRepliesAPI(app: Express) {
  app.get(forumReplysURL, async (req, res) => {
    const { limit: limitQ, offset: offsetQ } = req.query
    const { comment_id: comment_idP } = req.params
    try {
      const comment_id = Number(comment_idP)
      if (isNaN(comment_id)) {
        res.status(400).send('Неверный comment_id')
        return
      }
      let limit = Number(limitQ)
      if (isNaN(limit)) limit = 10

      let offset = Number(offsetQ)
      if (isNaN(offset)) offset = 0

      const replies = await Reply.findAll({
        attributes: ['creator_id', 'text', 'reply_id', 'createdAt'],
        where: { comment_id },
        limit,
        offset,
      })
      res.status(200).send(JSON.stringify(replies))
    } catch (e) {
      console.log(e)
      res.status(400).send('Не получилось выбрать данные из базы данных')
    }
  })
}
