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
  selectTopicTitle,
  selectTopicDescription,
} from '../../redux/selectors'
import { getComments, loadCommentsCount, sendComment } from './actions'
import {
  Box,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import bem from 'bem-ts'
import './styles.scss'
import { IDLE, INIT_OFFSET, itemsLimits } from '../../constants/forumConstants'
import { IUser } from '../Profile/model'
import PrimitiveButton from '../../components/PrimitiveButton/PrimitiveButton'

const ForumPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  if (!id) {
    console.log('Что-то пошло не так')
    return navigate(window.location.href)
  }
  const cn = bem('forumPage')
  const { first_name, second_name, avatar } = useTypedSelector(
    getUserData
  ) as IUser
  const title = useTypedSelector(selectTopicTitle)
  const description = useTypedSelector(selectTopicDescription)
  const dispatch = useAppDispatch()
  const goBack = useCallback(() => navigate(-1), [])
  const comments = useTypedSelector(getTopicData)
  const isLoad = useTypedSelector(isTopicDataLoad)
  const limits = useMemo(() => itemsLimits, [itemsLimits])
  const [page, setPage] = useState(1)
  const [commentsLimit, setTopicLimit] = useState(limits[0])
  const [commentsOffset, setOffset] = useState(INIT_OFFSET)
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
    if (comments === IDLE) {
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
        <div className={cn('perPage')}>
          <PrimitiveButton onClick={goBack}>Назад</PrimitiveButton>
          <Box>
            <span>Комментов на страницу: </span>
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
          </Box>
        </div>
        <Box className={cn('header')}>
          <span>Тема {title}</span>
          <span>Вопрос: {description ? description : 'Нет описания'}</span>
        </Box>
        <ForumMessagesList messages={comments} />
        <div className={cn('controls')}>
          {pages && pages > 1 && (
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

export default ForumPage
