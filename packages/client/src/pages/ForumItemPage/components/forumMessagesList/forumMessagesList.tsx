import { memo, useEffect, useState } from 'react'
import bem from 'bem-ts'
import './styles.scss'
import { getAuthor } from './actions'
import { IUser } from '../../../Profile/model'
import { IComment } from '../../../../redux/features/topicSlice'

const ForumMessagesList = ({
  messages,
  pagination,
}: {
  messages: IComment[] | 'idle'
  pagination: ReactNode
}) => {
  if (messages === 'idle') return <></>
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
    <>
      <ul className={cn()}>
        {messages.map(({ comment_id, text, creator_id, createdAt }) => {
          return (
            <li key={comment_id} className={cn('message')}>
              <div className={cn('messageHeader')}>
                <Author id={String(creator_id)} />
                <span>{getTime(new Date(createdAt))}</span>
              </div>
              <p>{text}</p>
            </li>
          )
        })}
      </ul>
      {pagination}
    </>
  )
}

export default memo(ForumMessagesList)

const Author = ({ id }: { id: string }) => {
  const [user, setName] = useState<IUser | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await getAuthor(id)
        setName(data)
      } catch (err) {
        console.log(err)
      }
    }

    if (!user) getUser()
  }, [id])

  return user && <span>{user.first_name + ' ' + user.second_name}</span>
}
