import { memo, useCallback, useEffect, MouseEvent, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import bem from 'bem-ts'
import './styles.scss'

import ForumMessagesList from './components/forumMessagesList/forumMessagesList'
import AddMessageFrame from './components/addMessageFrame/addMessageFrame'
import { ITopic } from '../../redux/features/forumSlice'
import { messageFormFileds } from './model'
import { useAppDispatch, useTypedSelector } from '../../redux/store'
import { load, setCommets, setError } from '../../redux/features/topicSlice'
import { getTopicData, isTopicDataLoad } from '../../redux/selectors'
import { getComments } from './actions'
import { privateRoutes } from '../../router/router'

const ForumPage = () => {
  const cn = bem('forumPage')
  const dispatch = useAppDispatch()
  const { id } = useParams()
  if (!id) return <Navigate to={privateRoutes.forum.path} />
  const comments = useTypedSelector(getTopicData)
  const isLoad = useTypedSelector(isTopicDataLoad)
  const limits = [10, 20, 30]
  const [commentsLimit, setTopicLimit] = useState(limits[0])
  const onPerpage = useCallback(
    (_event: MouseEvent<HTMLElement>, value: number) => setTopicLimit(value),
    []
  )
  const [commentsOffset, setOffset] = useState(0)

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
  console.log(comments)
  // const forum = useMemo(() => forums.find(el => el.id === id), [id])

  // if (!forum) return <Navigate to="*" />
  // const { theme, messages }: ITopic = forum
  // const [forumMessages, updateForum] = useState(messages)

  // const callbacks = {
  //   onAddMessage: useCallback(
  //     (e: FormEvent) => {
  //       e.preventDefault()
  //       // add logic of Logged user and server part
  //       const message = (
  //         (e.target as HTMLFormElement)[
  //           messageFormFileds.message
  //         ] as HTMLFormElement
  //       ).value
  //       const newMesage: TMessage = {
  //         messageId: uuid(),
  //         message,
  //         author: 'Admin',
  //         time: new Date(),
  //       }
  //       forum.messages.push(newMesage)
  //       updateForum(prev => [...prev, newMesage])
  //       const searchedForum = previeForums.find(el => el.id === id)
  //       if (searchedForum) searchedForum.messages += 1
  //     },
  //     [id]
  //   ),
  // }

  return (
    <div className={cn({ chesBackgrounded: true })}>
      <div className={cn('container')}>
        {/* <h1 className={cn('theme')}>{theme}</h1> */}
        {/* <ForumMessagesList messages={forumMessages} /> */}
        <AddMessageFrame
          inputName={messageFormFileds.message}
          // onAddMessage={onAddMessage}
        />
      </div>
    </div>
  )
}

export default memo(ForumPage)
