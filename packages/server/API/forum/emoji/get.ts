import { forumEmojiURL } from '../../url'
import type { Express } from 'express'
import { Emoji } from '../../database'

export default function getEmojiAPI(app: Express) {
  app.get(forumEmojiURL, async (req, res) => {
    const { limit: limitQ, offset: offsetQ } = req.query
    const { emoji_id: emoji_idP } = req.params
    try {
      const emoji_id = Number(emoji_idP)
      if (isNaN(emoji_id)) {
        res.status(400).send('Неверный comment_id')
        return
      }
      let limit = Number(limitQ)
      if (isNaN(limit)) limit = 10

      let offset = Number(offsetQ)
      if (isNaN(offset)) offset = 0

      const replies = await Emoji.findAll({
        attributes: ['creator_id', 'emoji', 'topic_id'],
        where: { emoji_id },
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
