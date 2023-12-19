import type { Request, Response } from 'express'
import { Comment, Emoji, Reply, Topic, returnModelCount } from '../database'

export async function countEmoji(req: Request, res: Response) {
  const { topic_id: topic_idP } = req.params
  const topic_id = Number(topic_idP)
  if (isNaN(topic_id)) {
    res.status(400).send('Неверный topic_id')
    return
  }
  returnModelCount(Emoji, res, { topic_id })
}

export async function countComments(req: Request, res: Response) {
  const { topic_id: topic_idP } = req.params
  const topic_id = Number(topic_idP)
  if (isNaN(topic_id)) {
    res.status(400).send('Неверный topic_id')
    return
  }
  returnModelCount(Comment, res, { topic_id })
}

export async function countReplies(req: Request, res: Response) {
  const { comment_id: comment_idP } = req.params
  const comment_id = Number(comment_idP)
  if (isNaN(comment_id)) {
    res.status(400).send('Неверный comment_id')
    return
  }
  returnModelCount(Reply, res, { comment_id })
}

export async function countTopics(_: Request, res: Response) {
  returnModelCount(Topic, res)
}
