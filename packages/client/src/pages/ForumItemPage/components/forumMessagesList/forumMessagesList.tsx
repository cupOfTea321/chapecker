import { FormEvent, memo, useCallback, useState } from 'react'
import { getTime, sendReply } from './actions'
import { IComment } from '../../../../redux/features/topicSlice'
import RepliesFrame from '../repliesFrame/RepliesFrame'
import Loader from '../../../../components/loader/loader'
import bem from 'bem-ts'
import './styles.scss'
import AddMessageFrame from '../addMessageFrame/addMessageFrame'
import { messageFormFileds } from '../../model'
import Author from '../author/author'

const ForumMessagesList = ({ messages }: { messages: IComment[] | 'idle' }) => {
  if (messages === 'idle') return <Loader />

  const cn = bem('forumMessages')
  const [replyFrame, setRepleyFrame] = useState<{
    open: boolean
    comment_id: null | number
  }>({ open: false, comment_id: null })
  const [isSending, setSending] = useState(false)

  const onReply = useCallback(async (e: FormEvent, comment_id: number) => {
    e.preventDefault()
    setSending(true)
    const message: string = (e.target as HTMLFormElement)[
      messageFormFileds.message
    ].value

    try {
      await sendReply({ text: message, comment_id })
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      console.log(err)
    } finally {
      setSending(false)
    }
  }, [])

  return (
    <>
      <ul className={cn()}>
        {messages.map(({ comment_id, text, creator_id, createdAt }) => {
          return (
            <li key={comment_id} className={cn('message')}>
              <div className={cn('messageHeader')}>
                <Author id={creator_id} />
                <span>{getTime(new Date(createdAt))}</span>
              </div>
              <p>{text}</p>
              <div className={cn('replyContainer')}>
                <RepliesFrame comment_id={comment_id} />
                <span
                  className={cn('reply')}
                  onClick={() => setRepleyFrame({ open: true, comment_id })}
                  hidden={
                    replyFrame.open && replyFrame.comment_id === comment_id
                  }>
                  Ответить
                </span>
                {replyFrame.open && replyFrame.comment_id === comment_id && (
                  <AddMessageFrame
                    onAddMessage={e => onReply(e, comment_id)}
                    inputName={messageFormFileds.message}
                    label="Ответить"
                    close={() =>
                      setRepleyFrame({ open: false, comment_id: null })
                    }
                    isDisabled={isSending}
                  />
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default memo(ForumMessagesList)
