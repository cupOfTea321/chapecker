import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import Topic from './Models/Topic'
import Reply from './Models/Reply'
import Comment from './Models/Comment'

export default function connectToPG() {
  const sequelizeOptions: SequelizeOptions = {
    host: 'localhost',
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
    models: [Topic, Comment, Reply],
  }

  const sequelize = new Sequelize(sequelizeOptions)
  sequelize
    .sync()
    .then(async () => {
      console.log('Connected to postgress')
    })
    .catch(() => {
      throw new Error('Ошибка подключения к базе данных')
    })
  return sequelize
}

export { default as Topic } from './Models/Topic'
export { default as Comment } from './Models/Comment'
export { default as Reply } from './Models/Reply'
