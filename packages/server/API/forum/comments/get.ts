import type { Request, Response } from 'express'
import { Comment } from '../../database'

export default async function getComments(req: Request, res: Response) {
  const { topic_id: topic_idP } = req.params
  const topic_id = Number(topic_idP)
  if (isNaN(topic_id)) {
    res.status(400).send('Неверный topic_id')
    return
  }

  const { limit: limitQ, offset: offsetQ } = req.query
  try {
    const limit = isNaN(Number(limitQ)) ? 10 : Number(limitQ)
    const offset = isNaN(Number(offsetQ)) ? 0 : Number(offsetQ)

    const comments = await Comment.findAll({
      attributes: [
        'first_name',
        'second_name',
        'avatar',
        'text',
        'comment_id',
        'createdAt',
      ],
      where: { topic_id },
      limit,
      offset,
    })
    res.status(200).send(JSON.stringify(comments))
  } catch (e) {
    console.log(e)
    res.status(400).send('Не получилось выбрать данные из базы данных')
  }
}
