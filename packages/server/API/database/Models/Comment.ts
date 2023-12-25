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
  Index,
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
  @Column(DataType.STRING)
  first_name: string | undefined

  @AllowNull(false)
  @Column(DataType.STRING)
  second_name: string | undefined

  @AllowNull(true)
  @Column(DataType.STRING)
  avatar: string | undefined

  @AllowNull(false)
  @Column(DataType.STRING)
  creator_id: string | undefined

  @AllowNull(false)
  @ForeignKey(() => Topic)
  @Column(DataType.INTEGER)
  @Index
  topic_id: string | undefined
}

export default Comment
