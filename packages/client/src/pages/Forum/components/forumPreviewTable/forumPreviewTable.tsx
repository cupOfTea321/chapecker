import { memo } from 'react'
import { getForumPath } from '../../../../routes'

import bem from 'bem-ts'
import './styles.scss'

import { IForumPreview, TForumPreview } from './model'
import { Link } from 'react-router-dom'

const ForumPreviewTable = (props: {
  header: string
  forums: TForumPreview
}) => {
  const cn = bem('forumPreview')

  return (
    <table className={cn()}>
      <caption className={cn('caption')}>{props.header}</caption>
      <thead className={cn('haeder')}>
        <th className={cn('haederTheme')}>Theme</th>
        <th className={cn('haederMessagesCount')}>Messages</th>
        <th className={cn('haederLastMessage')}>Last message</th>
      </thead>
      <tbody>
        {props.forums.map(
          ({ id, theme, messages, lastMessage }: IForumPreview) => (
            <tr key={id} className={cn('item')}>
              <td className={cn('itemDivision')}>
                {
                  <Link
                    className={cn('itemDivision', { link: true })}
                    to={getForumPath().concat('/', id)}>
                    {theme}
                  </Link>
                }
              </td>
              <td className={cn('itemDivision', { info: true })}>{messages}</td>
              <td className={cn('itemDivision', { info: true })}>
                {lastMessage.user}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export default memo(ForumPreviewTable)
