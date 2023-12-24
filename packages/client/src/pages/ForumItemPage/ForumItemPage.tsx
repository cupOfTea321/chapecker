import {
  memo,
  useCallback,
  useEffect,
  MouseEvent,
  useState,
  FormEvent,
  ChangeEvent,
} from 'react'
import { useParams } from 'react-router-dom'
import ForumMessagesList from './components/forumMessagesList/forumMessagesList'
import AddMessageFrame from './components/addMessageFrame/addMessageFrame'
import { messageFormFileds } from './model'
import { useAppDispatch, useTypedSelector } from '../../redux/store'
import {
  load,
  setCommets,
  setError,
  reload,
} from '../../redux/features/topicSlice'
import { getTopicData, isTopicDataLoad } from '../../redux/selectors'
import { getComments, sendComment } from './actions'
import { Pagination, ToggleButton, ToggleButtonGroup } from '@mui/material'
import bem from 'bem-ts'
import './styles.scss'

const ForumPage = () => {
  const { id } = useParams() as { id?: number }
  const cn = bem('forumPage')
  const dispatch = useAppDispatch()

  const comments = useTypedSelector(getTopicData)
  const isLoad = useTypedSelector(isTopicDataLoad)
  const limits = [10, 20, 30]
  const [page, setPage] = useState(1)
  const [commentsLimit, setTopicLimit] = useState(limits[0])
  const onPerpage = useCallback(
    (_event: MouseEvent<HTMLElement>, value: number) => {
      setTopicLimit(value)
      dispatch(reload())
    },
    []
  )
  const [commentsOffset, setOffset] = useState(0)
  const pages =
    comments.length === commentsLimit
      ? Math.ceil(comments.length / commentsLimit)
      : null
  const onPagination = useCallback(
    (_e: ChangeEvent<unknown>, page: number) => {
      const quatifier =
        page < 1 ? page * commentsLimit : (page - 1) * commentsLimit
      setOffset(quatifier)
      setPage(page)
      dispatch(reload())
    },
    [commentsOffset, setOffset]
  )

  useEffect(() => {
    const loadTopics = async () => {
      try {
        dispatch(load(true))
        const { data } = await getComments({
          id: id ? String(id) : '0',
          limit: commentsLimit,
          offset: commentsOffset,
        })
        dispatch(setCommets(data))
      } catch (err) {
        setError(err)
      } finally {
        dispatch(load(false))
      }
    }
    if (comments === 'idle') {
      loadTopics()
    }
  }, [id, load, comments])

  const onComment = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      dispatch(load(true))
      const message: string = (e.target as HTMLFormElement)[
        messageFormFileds.message
      ].value

      try {
        await sendComment({ text: message, topic_id: id })
        dispatch(reload())
        ;(e.target as HTMLFormElement).reset()
      } catch (err) {
        setError(err)
      } finally {
        dispatch(load(false))
      }
    },
    [id]
  )

  return (
    <div className={cn({ chesBackgrounded: true })}>
      <div className={cn('container')}>
        <ToggleButtonGroup
          value={commentsLimit}
          exclusive
          onChange={onPerpage}
          aria-label="Platform">
          {limits.map(value => (
            <ToggleButton color="warning" key={value} value={value}>
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <ForumMessagesList messages={comments} />
        <div className={cn('controls')}>
          {pages && (
            <Pagination
              onChange={onPagination}
              count={pages}
              page={page}
              variant="outlined"
              color="primary"
            />
          )}
          <AddMessageFrame
            inputName={messageFormFileds.message}
            label={'Оставить комментарий'}
            onAddMessage={onComment}
            isDisabled={isLoad}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(ForumPage)
