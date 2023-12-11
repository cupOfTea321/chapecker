import { getUserId } from '../../cookies'
import { forumEmojiAddURL } from '../../url'
import type { Express } from 'express'
import { Emoji } from '../../database'

export default function postEmojiAPI(app: Express) {
  app.post(forumEmojiAddURL, async (req, res) => {
    const creator_id = await getUserId(req)
    if (!creator_id) {
      res.status(401).send('')
      return
    }
    const { emoji, emoji_id } = req.body
    if (!emoji) {
      res.status(400).send('Пустой emoji')
      return
    }
    if (!emoji_id) {
      res.status(400).send('Не указан emoji_id')
      return
    }
    try {
      await Emoji.create({
        creator_id,
        emoji_id,
        emoji,
      })
      res.status(201).send('OK')
    } catch (e) {
      console.log(e)
      res.status(400).send('Не получилось создать запись в базе данных')
    }
  })
}
