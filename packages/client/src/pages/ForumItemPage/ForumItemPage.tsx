import {
  memo,
  useCallback,
  useEffect,
  MouseEvent,
  useState,
  FormEvent,
  ChangeEvent,
} from 'react'
import { Navigate, useParams } from 'react-router-dom'
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
import { privateRoutes } from '../../router/router'
import { Pagination, ToggleButton, ToggleButtonGroup } from '@mui/material'
import bem from 'bem-ts'
import './styles.scss'

const ForumPage = () => {
  const { id } = useParams()
  if (!id) return <Navigate to={privateRoutes.forum.path} />
  const cn = bem('forumPage')
  const dispatch = useAppDispatch()

  const comments = useTypedSelector(getTopicData)
  const isLoad = useTypedSelector(isTopicDataLoad)
  const limits = [10, 20, 30]
  const [commentsLimit, setTopicLimit] = useState(limits[0])
  const onPerpage = useCallback(
    (_event: MouseEvent<HTMLElement>, value: number) => setTopicLimit(value),
    []
  )
  const [commentsOffset, setOffset] = useState(0)
  const pages =
    comments.length === commentsLimit
      ? Math.ceil(comments.length / commentsLimit)
      : null
  const onPagination = useCallback(
    (_e: ChangeEvent<unknown>, page: number) => {
      setOffset(page)
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
      const message: string = (
        (e.target as HTMLFormElement)[
          messageFormFileds.message
        ] as HTMLFormElement
      ).value
      try {
        await sendComment({ text: message, topic_id: id })
        dispatch(reload)
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
        <ForumMessagesList
          messages={comments}
          pagination={
            <Pagination
              onChange={onPagination}
              count={pages ? pages + 1 : 1}
              page={commentsOffset}
              variant="outlined"
              color="primary"
            />
          }
        />
        <AddMessageFrame
          inputName={messageFormFileds.message}
          onAddMessage={onComment}
          isDisabled={isLoad}
        />
      </div>
    </div>
  )
}

export default memo(ForumPage)
