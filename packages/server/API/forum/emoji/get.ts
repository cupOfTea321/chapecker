import type { Request, Response } from 'express'
import { Emoji } from '../../database'

export default async function getEmoji(req: Request, res: Response) {
  const { limit: limitQ, offset: offsetQ } = req.query
  const { topic_id: topic_idP } = req.params
  try {
    const topic_id = Number(topic_idP)
    if (isNaN(topic_id)) {
      res.status(400).send('Неверный topic_id')
      return
    }

    const limit = isNaN(Number(limitQ)) ? 10 : Number(limitQ)
    const offset = isNaN(Number(offsetQ)) ? 0 : Number(offsetQ)

    const replies = await Emoji.findAll({
      attributes: ['creator_id', 'emoji', 'topic_id'],
      where: { topic_id },
      limit,
      offset,
    })
    res.status(200).send(JSON.stringify(replies))
  } catch (e) {
    console.log(e)
    res.status(500).send('Не получилось выбрать данные из базы данных')
  }
}
