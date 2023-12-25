import type { Request, Response } from 'express'
import { Reply } from '../../database'

export default async function getReplies(req: Request, res: Response) {
  const { limit: limitQ, offset: offsetQ } = req.query
  const { comment_id: comment_idP } = req.params
  try {
    const comment_id = Number(comment_idP)
    if (isNaN(comment_id)) {
      res.status(400).send('Неверный comment_id')
      return
    }

    const limit = isNaN(Number(limitQ)) ? 10 : Number(limitQ)
    const offset = isNaN(Number(offsetQ)) ? 0 : Number(offsetQ)

    const replies = await Reply.findAll({
      attributes: [
        'first_name',
        'second_name',
        'avatar',
        'creator_id',
        'text',
        'reply_id',
        'createdAt',
      ],
      where: { comment_id },
      limit,
      offset,
    })
    res.status(200).send(JSON.stringify(replies))
  } catch (e) {
    console.log(e)
    res.status(400).send('Не получилось выбрать данные из базы данных')
  }
}
