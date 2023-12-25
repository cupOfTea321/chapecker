import { ReactNode, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ITopic } from '../../../../redux/features/forumSlice'
import { setTitleAndDescription } from '../../../../redux/features/topicSlice'
import { Box } from '@mui/material'
import getToThisday from '../../../../utils/getToThisData'
import { IDLE } from '../../../../constants/forumConstants'
import bem from 'bem-ts'
import './styles.scss'
import { useAppDispatch } from '../../../../redux/store'

const ForumPreviewTable = ({
  perPage,
  paginator,
  forums,
}: {
  perPage?: ReactNode
  paginator?: ReactNode
  forums: typeof IDLE | ITopic[]
}) => {
  const cn = bem('forumPreview')
  if (forums === IDLE || forums.length === 0) {
    return <></>
  }

  const dispatch = useAppDispatch()
  const onItemClick = useCallback(
    ({ title, description }: { title: string; description: string }) =>
      dispatch(setTitleAndDescription({ title, description })),
    []
  )

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
                      onClick={() => onItemClick({ title, description })}
                      className={cn('itemDivision', { link: true })}
                      to={window.location.href.concat('/', String(topic_id))}>
                      {title}
                    </Link>
                    <div className={cn('itemDivision', { description: true })}>
                      {description}
                    </div>
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
