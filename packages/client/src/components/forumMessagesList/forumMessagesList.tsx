import { memo } from 'react'
import { TMessage } from '../../pages/forumItemPage/model'

import bem from 'bem-ts'
import './styles.scss'

const ForumMessagesList = ({ messages }: { messages: TMessage[] }) => {
  const cn = bem('forumMessages')
  const getTime = (time: Date) => {
    return (
      time.getFullYear() +
      '-' +
      Number(time.getMonth() + 1) +
      '-' +
      time.getDate() +
      ' at ' +
      time.getHours() +
      ':' +
      time.getMinutes()
    )
  }

  return (
    <ul className={cn()}>
      {messages.map(({ messageId, time, author, message }) => (
        <li key={messageId} className={cn('message')}>
          <div className={cn('messageHeader')}>
            <span>{author}</span>
            <span>{getTime(time)}</span>
          </div>
          <p>{message}</p>
        </li>
      ))}
    </ul>
  )
}

export default memo(ForumMessagesList)
