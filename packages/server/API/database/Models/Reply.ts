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
import Comment from './Comment'

@Table
class Reply extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  reply_id: number | undefined

  @AllowNull(false)
  @Column(DataType.STRING(50))
  text: string | undefined

  @AllowNull(false)
  @Column(DataType.INTEGER)
  creator_id: number | undefined

  @AllowNull(false)
  @ForeignKey(() => Comment)
  @Column(DataType.INTEGER)
  comment_id: string | undefined
}

export default Reply
