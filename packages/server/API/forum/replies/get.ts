import { forumReplysURL } from '../../url'
import type { Express } from 'express'
import { Reply } from '../../database'

export default function getRepliesAPI(app: Express) {
  app.get(forumReplysURL, async (req, res) => {
    const { limit: limitQ, offset: offsetQ } = req.query
    const { comment_id: comment_idP } = req.params
    try {
      const comment_id = Number(comment_idP)
      if (isNaN(comment_id) || typeof comment_id !== 'number') {
        res.status(400).send('Неверный comment_id')
        return
      }
      let limit: number | undefined = Number(limitQ)
      if (isNaN(limit) || typeof limit !== 'number') limit = 10
      let offset: number | undefined = Number(offsetQ)
      if (isNaN(offset) || typeof limit !== 'number') offset = 0

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
