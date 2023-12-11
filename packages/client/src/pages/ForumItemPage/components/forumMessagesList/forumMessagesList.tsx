import { memo, useState } from 'react'
import { TMessage } from '../../model'

import bem from 'bem-ts'
import './styles.scss'
import { forums } from '../../../Forum/components/forumPreviewTable/stubs'

const emoji = ['😀', '🤑', '😭', '💩', '❤', '👍']
const ForumMessagesList = ({ messages }: { messages: TMessage[] }) => {
  const [selectedEmoji, setSelectedEmoji] = useState('')

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji)
  }
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
          {selectedEmoji}
          <p>{message}</p>
          <div
            style={{
              display: 'flex',
            }}>
            {emoji.map((item, index) => (
              <div>
                <button
                  key={item}
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                  onClick={() => handleEmojiSelect(`${item}`)}>
                  {item}
                </button>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default memo(ForumMessagesList)
