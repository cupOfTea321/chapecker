import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import Topic from './Models/Topic'

export { default as Topic } from './Models/Topic'

export default function connectToPG() {
  const sequelizeOptions: SequelizeOptions = {
    host: 'localhost',
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
    models: [Topic],
  }

  const sequelize = new Sequelize(sequelizeOptions)
  sequelize.sync().then(async () => {
    console.log('Connected to postgress')
  })
  return sequelize
}
