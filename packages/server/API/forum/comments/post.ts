import { getUserId } from '../../cookies'
import type { Request, Response } from 'express'
import { Comment } from '../../database'

export default async function postReply(req: Request, res: Response) {
  const creator_id = await getUserId(req)
  if (!creator_id) {
    res.status(401).send('')
    return
  }
  const { text, topic_id, first_name, second_name, avatar } = req.body
  if (!text) {
    res.status(400).send('Пустой комментарий')
    return
  }
  if (!topic_id) {
    res.status(400).send('Не указан topic_id')
    return
  }

  try {
    await Comment.create({
      first_name,
      second_name,
      avatar,
      creator_id,
      topic_id,
      text,
    })
    res.status(201).send('OK')
  } catch (e) {
    console.log(e)
    res.status(400).send('Не получилось создать запись в базе данных')
  }
}
