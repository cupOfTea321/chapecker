import { FormEvent, memo, useCallback, useState } from 'react'
import { sendReply } from './actions'
import { IComment, reload } from '../../../../redux/features/topicSlice'
import RepliesFrame from '../repliesFrame/RepliesFrame'
import Loader from '../../../../components/loader/loader'
import bem from 'bem-ts'
import './styles.scss'
import AddMessageFrame from '../addMessageFrame/addMessageFrame'
import { messageFormFileds } from '../../model'
import getToThisday from '../../../../utils/getToThisData'
import { useAppDispatch, useTypedSelector } from '../../../../redux/store'
import { getUserData } from '../../../../redux/selectors'
import { IDLE } from '../../../../constants/forumConstants'
import { IUser } from '../../../Profile/model'

const ForumMessagesList = ({
  messages,
}: {
  messages: IComment[] | typeof IDLE
}) => {
  if (messages === IDLE) {
    return <Loader />
  }
  const { first_name, second_name, avatar } = useTypedSelector(
    getUserData
  ) as IUser
  const cn = bem('forumMessages')
  const [replyFrame, setRepleyFrame] = useState<{
    open: boolean
    comment_id: null | number
  }>({ open: false, comment_id: null })
  const [isSending, setSending] = useState(false)
  const dispatch = useAppDispatch()
  const onReply = useCallback(async (e: FormEvent, comment_id: number) => {
    e.preventDefault()
    setSending(true)
    const text: string = (e.target as HTMLFormElement)[
      messageFormFileds.message
    ].value

    try {
      await sendReply({ text, comment_id, first_name, second_name, avatar })
      ;(e.target as HTMLFormElement).reset()
      dispatch(reload())
    } catch (err) {
      console.log(err)
    } finally {
      setSending(false)
    }
  }, [])

  return (
    <ul className={cn()}>
      {messages.map(
        ({ comment_id, text, first_name, second_name, createdAt }) => {
          return (
            <li key={comment_id} className={cn('message')}>
              <div className={cn('messageHeader')}>
                <span>{first_name + ' ' + second_name}</span>
                <span>{getToThisday(createdAt)}</span>
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
                    label="Ответить на комментарий"
                    close={() =>
                      setRepleyFrame({ open: false, comment_id: null })
                    }
                    isDisabled={isSending}
                  />
                )}
              </div>
            </li>
          )
        }
      )}
    </ul>
  )
}

export default memo(ForumMessagesList)
