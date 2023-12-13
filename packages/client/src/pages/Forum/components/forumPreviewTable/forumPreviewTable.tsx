import { memo, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ITopic } from '../../../../redux/features/forumSlice'
import { forumSSRURL } from '../../../../API/endpoints'
import bem from 'bem-ts'
import './styles.scss'

const ForumPreviewTable = ({
  perPage,
  forums,
}: {
  perPage?: ReactNode
  forums: 'idle' | ITopic[]
}) => {
  const cn = bem('forumPreview')
  if (forums === 'idle' || forums.length === 0) return <></>

  return (
    <table className={cn()}>
      <caption className={cn('caption')}>На странице: {perPage}</caption>
      <thead className={cn('haeder')}>
        <tr>
          <th className={cn('haederTheme')}>Тема</th>
          <th className={cn('haederLastMessage')}>Создана</th>
        </tr>
      </thead>
      <tbody>
        {forums.map(({ topic_id, title, createdAt }: ITopic) => (
          <tr key={topic_id} className={cn('item')}>
            <td className={cn('itemDivision')}>
              {
                <Link
                  className={cn('itemDivision', { link: true })}
                  to={forumSSRURL.concat(String(topic_id))}>
                  {title}
                </Link>
              }
            </td>
            <td className={cn('itemDivision', { info: true })}>
              {getToThisday(createdAt)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default memo(ForumPreviewTable)

const getToThisday = (createdAt: string) => {
  const now = new Date()
  const created = new Date(createdAt)
  switch (now.getDay() - created.getDay()) {
    case 0:
      return (
        created.getHours() +
        ':' +
        (created.getMinutes() < 10
          ? '0' + created.getMinutes()
          : created.getMinutes())
      )
    case -1:
      return created.getDay()
    default:
      return (
        created.getDate() +
        '.' +
        (Number(created.getMonth()) + 1) +
        '.' +
        created.getFullYear()
      )
  }
}
