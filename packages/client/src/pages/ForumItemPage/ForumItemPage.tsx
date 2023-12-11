import { FormEvent, memo, useCallback, useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import bem from 'bem-ts'
import './styles.scss'

import { forums } from './stubs'
import { forums as previeForums } from '../Forum/components/forumPreviewTable/stubs'
import { TForum, TMessage, messageFormFileds } from './model'
import ForumMessagesList from './components/forumMessagesList/forumMessagesList'
import AddMessageFrame from './components/addMessageFrame/addMessageFrame'
import { useTypedSelector } from '../../redux/store'
import { getUserData } from '../../redux/selectors'

const ForumPage = () => {
  const { id } = useParams()
  const forum = useMemo(() => forums.find(el => el.id === id), [id])
  const cn = bem('forumPage')
  if (!forum) return <Navigate to="*" />
  const { theme, messages }: TForum = forum
  const [forumMessages, updateForum] = useState(messages)
  const user = useTypedSelector(getUserData)
  console.log(user)
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
          author: user.login ? user.login : 'Author',
          time: new Date(),
        }
        forum.messages.push(newMesage)
        updateForum(prev => [...prev, newMesage])
        const searchedForum = previeForums.find(el => el.id === id)
        if (searchedForum) searchedForum.messages += 1
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
          name={user.login}
        />
      </div>
    </div>
  )
}

export default memo(ForumPage)
