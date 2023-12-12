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
class Emoji extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  emoji_id: number | undefined

  @AllowNull(false)
  @Column(DataType.STRING(50))
  emoji: string | undefined

  @AllowNull(false)
  @Column(DataType.INTEGER)
  creator_id: number | undefined

  @AllowNull(false)
  @ForeignKey(() => Topic)
  @Column(DataType.INTEGER)
  @Index
  topic_id: string | undefined
}

export default Emoji
