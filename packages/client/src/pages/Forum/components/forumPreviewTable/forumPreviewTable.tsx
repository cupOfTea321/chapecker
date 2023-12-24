import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ITopic } from '../../../../redux/features/forumSlice'
import bem from 'bem-ts'
import './styles.scss'
import { Box } from '@mui/material'
import getToThisday from '../../utils/getToThisData'

const ForumPreviewTable = ({
  perPage,
  paginator,
  forums,
}: {
  perPage?: ReactNode
  paginator?: ReactNode
  forums: 'idle' | ITopic[]
}) => {
  const cn = bem('forumPreview')
  if (forums === 'idle' || forums.length === 0) return <></>

  return (
    <div>
      <table className={cn()}>
        <thead className={cn('haeder')}>
          <tr>
            <th className={cn('haederTheme')}>Тема</th>
            <th className={cn('haederLastMessage')}>Создана</th>
          </tr>
        </thead>
        <tbody>
          {forums.map(({ topic_id, title, description, createdAt }: ITopic) => (
            <tr key={topic_id} className={cn('item')}>
              <td className={cn('itemDivision')}>
                {
                  <Box>
                    <Link
                      className={cn('itemDivision', { link: true })}
                      to={window.location.href.concat('/', String(topic_id))}>
                      {title}
                    </Link>
                    <div className={cn('itemDivision', { description: true })}>{description}</div>
                  </Box>
                }
              </td>
              <td className={cn('itemDivision', { info: true })}>
                {getToThisday(createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={cn('controls')}>
          <span className={cn('captionPaginator')}>{paginator}</span>
          <span className={cn('captionPerpage')}>Тем на странице: {perPage}</span>
      </div>
    </div>
  )
}

export default ForumPreviewTable
