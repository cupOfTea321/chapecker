import type { Response } from 'express'
import type { WhereOptions } from 'sequelize'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import Topic from './Models/Topic'
import Reply from './Models/Reply'
import Comment from './Models/Comment'
import Emoji from './Models/Emoji'

export default function connectToPG() {
  const sequelizeOptions: SequelizeOptions = {
    host: 'localhost',
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
    models: [Topic, Comment, Reply, Emoji],
  }

  const sequelize = new Sequelize(sequelizeOptions)
  sequelize
    .sync({ force: true })
    .then(async () => {
      console.log('Connected to postgress')
    })
    .catch(() => {
      throw new Error('Ошибка подключения к базе данных')
    })
  return sequelize
}

export async function returnModelCount(
  model: unknown & { count: (o: object) => Promise<number> },
  res: Response,
  where?: WhereOptions
) {
  try {
    const count = await model.count({ where })
    res.status(200).send(JSON.stringify({ count }))
  } catch (e) {
    console.log(e)
    res.status(400).send('Не получилось выбрать данные из базы данных')
  }
}

export { default as Topic } from './Models/Topic'
export { default as Comment } from './Models/Comment'
export { default as Reply } from './Models/Reply'
export { default as Emoji } from './Models/Emoji'
