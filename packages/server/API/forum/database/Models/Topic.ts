// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Model,
  Table,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript'

@Table
class Topic extends Model<Topic> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  topic_id: number | undefined

  @AllowNull(false)
  @Column(DataType.STRING(50))
  title: string | undefined

  @AllowNull(false)
  @Column(DataType.INTEGER)
  creator_id: number | undefined
}

export default Topic
