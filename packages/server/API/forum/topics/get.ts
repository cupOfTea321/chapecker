import type { Request, Response } from 'express'
import { Topic } from './../../database/'

export default async function getTopics(req: Request, res: Response) {
  const { limit: limitQ, offset: offsetQ } = req.query
  try {
    const limit = isNaN(Number(limitQ)) ? 10 : Number(limitQ)
    const offset = isNaN(Number(offsetQ)) ? 0 : Number(offsetQ)

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
}
