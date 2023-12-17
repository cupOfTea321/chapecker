import type { Request, Response } from 'express'
import { Emoji } from '../../database'

export default async function getEmoji(req: Request, res: Response) {
  const { limit: limitQ, offset: offsetQ } = req.query
  const { emoji_id: emoji_idP } = req.params
  try {
    const emoji_id = Number(emoji_idP)
    if (isNaN(emoji_id)) {
      res.status(400).send('Неверный comment_id')
      return
    }

    const limit = isNaN(Number(limitQ)) ? 10 : Number(limitQ)
    const offset = isNaN(Number(offsetQ)) ? 0 : Number(offsetQ)

    const replies = await Emoji.findAll({
      attributes: ['creator_id', 'emoji', 'topic_id'],
      where: { emoji_id },
      limit,
      offset,
    })
    res.status(200).send(JSON.stringify(replies))
  } catch (e) {
    console.log(e)
    res.status(500).send('Не получилось выбрать данные из базы данных')
  }
}
