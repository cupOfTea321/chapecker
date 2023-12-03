/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Model,
  Table,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript'
import Topic from './Topic'

@Table
class Comment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  comment_id: number | undefined

  @AllowNull(false)
  @Column(DataType.STRING(50))
  text: string | undefined

  @AllowNull(false)
  @Column(DataType.INTEGER)
  creator_id: number | undefined

  @AllowNull(false)
  @ForeignKey(() => Topic)
  @Column(DataType.INTEGER)
  topic_id: string | undefined
}

export default Comment
