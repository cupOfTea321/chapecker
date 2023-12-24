import { getUserId } from '../../cookies'
import type { Request, Response } from 'express'
import { Reply } from '../../database'

export default async function postReply(req: Request, res: Response) {
  const creator_id = await getUserId(req)
  if (!creator_id) {
    res.status(401).send('')
    return
  }
  const { text, comment_id } = req.body
  if (!text) {
    res.status(400).send('Пустой комментарий')
    return
  }
  if (!comment_id) {
    res.status(400).send('Не указан comment_id')
    return
  }
  try {
    await Reply.create({
      creator_id,
      comment_id,
      text,
    })
    res.status(201).send('OK')
  } catch (e) {
    console.log(e)
    res.status(400).send('Не получилось создать запись в базе данных')
  }
}
