import {
  useCallback,
  useEffect,
  MouseEvent,
  useState,
  FormEvent,
  ChangeEvent,
  useMemo,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import {
  getTopicData,
  isTopicDataLoad,
  getCommentsCount,
  getUserData,
} from '../../redux/selectors'
import { getComments, loadCommentsCount, sendComment } from './actions'
import { Pagination, ToggleButton, ToggleButtonGroup } from '@mui/material'
import bem from 'bem-ts'
import './styles.scss'
import { itemsLimits } from '../../constants/forumConstants'
import { IUser } from '../Profile/model'

const ForumPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  if (!id) {
    console.log('Что-то пошло не так')
    return navigate(window.location.href)
  }
  const cn = bem('forumPage')
  const user = useTypedSelector(getUserData) as IUser
  const dispatch = useAppDispatch()

  const comments = useTypedSelector(getTopicData)
  const isLoad = useTypedSelector(isTopicDataLoad)
  const limits = useMemo(() => itemsLimits, [itemsLimits])
  const [page, setPage] = useState(1)
  const [commentsLimit, setTopicLimit] = useState(limits[0])
  const [commentsOffset, setOffset] = useState(0)
  const commentsCounts = useTypedSelector(getCommentsCount)
  const pages =
    commentsCounts > 0 ? Math.ceil(commentsCounts / commentsLimit) : null

  const onPerpage = useCallback(
    (_e: MouseEvent<HTMLElement>, value: number) => {
      if (value !== null) {
        setTopicLimit(value)
        setOffset(0)
        setPage(1)
        dispatch(reload())
      }
    },
    [commentsLimit]
  )
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
          id,
          limit: commentsLimit,
          offset: commentsOffset,
        })
        const {
          data: { count },
        } = await loadCommentsCount(id)
        dispatch(setCommets({ comments: data, commentsCount: count }))
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
      const { first_name, second_name, avatar } = user
      try {
        await sendComment({
          text: message,
          topic_id: id,
          first_name,
          second_name,
          avatar,
        })
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
            user={user}
            isDisabled={isLoad}
          />
        </div>
      </div>
    </div>
  )
}

export default ForumPage
