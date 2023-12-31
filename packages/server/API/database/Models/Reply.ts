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
  @Column(DataType.STRING)
  first_name: string | undefined

  @AllowNull(false)
  @Column(DataType.STRING)
  second_name: string | undefined

  @AllowNull(true)
  @Column(DataType.STRING)
  avatar: string | undefined

  @AllowNull(false)
  @Column(DataType.INTEGER)
  creator_id: number | undefined

  @AllowNull(false)
  @ForeignKey(() => Comment)
  @Column(DataType.INTEGER)
  @Index
  comment_id: string | undefined
}

export default Reply
