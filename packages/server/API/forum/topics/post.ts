import { getUserId } from './../../cookies'
import type { Request, Response } from 'express'
import { Topic } from './../../database/'

export default async function postReply(req: Request, res: Response) {
  const creator_id = await getUserId(req)
  if (!creator_id) {
    res.status(401).send('')
    return
  }
  const { title } = req.body
  if (!title) {
    res.status(400).send('Не указано название топика')
    return
  }
  let { description } = req.body
  if (!description) description = ''
  try {
    await Topic.create({
      creator_id,
      title,
      description,
    })
    res.status(201).send('OK')
  } catch (e) {
    console.log(e)
    res.status(400).send('Не получилось создать запись в базе данных')
  }
}
