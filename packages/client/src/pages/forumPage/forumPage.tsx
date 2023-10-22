import { FormEvent, memo, useCallback, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import bem from 'bem-ts'
import './styles.scss'

import { forums } from './stubs'
import { TForum, TMessage, messageFormFileds } from './model'
import ForumMessagesList from '../../components/forumMessagesList/forumMessagesList'
import AddMessageFrame from '../../components/addMessageFrame/addMessageFrame'

const ForumPage = () => {
  const cn = bem('forumPage')
  const { id } = useParams()
  const forum = useMemo(() => forums.find(el => el.id === id), [id])
  if (!forum) throw Error('No forum by id ' + id)
  const { theme, messages }: TForum = forum
  const [forumMessages, updateForum] = useState(messages)

  const callbacks = {
    onAddMessage: useCallback(
      (e: FormEvent) => {
        e.preventDefault()
        // add logic of Logged user and server part
        const message = (
          (e.target as HTMLFormElement)[
            messageFormFileds.message
          ] as HTMLFormElement
        ).value
        const newMesage: TMessage = {
          messageId: uuid(),
          message,
          author: 'Admin',
          time: new Date(),
        }
        forum.messages.push(newMesage)
        updateForum(prev => [...prev, newMesage])
      },
      [id]
    ),
  }

  return (
    <div className={cn({ chesBackgrounded: true })}>
      <div className={cn('container')}>
        <h1 className={cn('theme')}>{theme}</h1>
        <ForumMessagesList messages={forumMessages} />
        <AddMessageFrame
          inputName={messageFormFileds.message}
          onAddMessage={callbacks.onAddMessage}
        />
      </div>
    </div>
  )
}

export default memo(ForumPage)
