import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  MouseEvent,
  useMemo,
} from 'react'
import NewTopicForm from './components/newTopicForm/newTopicForm'
import ForumPreviewTable from './components/forumPreviewTable/forumPreviewTable'
import { forumTabs } from './model'
import getImageUrl from '../../utils/getImageUrl'
import { ToggleButtonGroup, ToggleButton, Pagination } from '@mui/material'
import { getTopics, getTopicsCount } from './actions'
import { useAppDispatch, useTypedSelector } from '../../redux/store'
import {
  getForumData,
  isForumDataLoad,
  getTopicsCounts,
} from '../../redux/selectors'
import {
  setTopics,
  load,
  setError,
  reload,
} from '../../redux/features/forumSlice'
import bem from 'bem-ts'
import './style.scss'
import Loader from '../../components/loader/loader'
import { itemsLimits } from '../../constants/forumConstants'

const ForumDashboard = () => {
  const cn = bem('forumDashboard')
  const dispatch = useAppDispatch()
  const tabsArr = Object.values(forumTabs)
  const limits = useMemo(() => itemsLimits, [itemsLimits])
  const [page, setPage] = useState(1)
  const [topicsLimit, setTopicLimit] = useState<number>(limits[0])
  const [topicsOffset, setOffset] = useState(0)
  const topics = useTypedSelector(getForumData)
  const topicsCounts = useTypedSelector(getTopicsCounts)
  const isLoad = useTypedSelector(isForumDataLoad)
  const pages = topicsCounts > 0 ? Math.ceil(topicsCounts / topicsLimit) : null

  const onPerpage = useCallback(
    (_e: MouseEvent<HTMLElement>, value: number) => {
      if (value !== null) {
        setTopicLimit(value)
        setOffset(0)
        setPage(1)
        dispatch(reload())
      }
    },
    [topicsLimit]
  )
  const onPagination = useCallback(
    (_e: ChangeEvent<unknown>, page: number) => {
      const quatifier = page < 1 ? page * topicsLimit : (page - 1) * topicsLimit
      setOffset(quatifier)
      setPage(page)
      dispatch(reload())
    },
    [topicsOffset, setOffset]
  )

  useEffect(() => {
    const loadTopics = async () => {
      try {
        dispatch(load(true))
        const { data } = await getTopics({
          limit: topicsLimit,
          offset: topicsOffset,
        })
        const {
          data: { count },
        } = await getTopicsCount()
        dispatch(setTopics({ topics: data, topicsCount: count }))
      } catch (err) {
        setError(err)
      } finally {
        dispatch(load(false))
      }
    }
    if (topics === 'idle') {
      loadTopics()
    }
  }, [topics, topicsOffset, topicsLimit])

  const Topics = () => (
    <ForumPreviewTable
      forums={topics}
      paginator={
        pages &&
        pages > 1 && (
          <Pagination
            onChange={onPagination}
            count={pages}
            page={page}
            variant="outlined"
          />
        )
      }
      perPage={
        <ToggleButtonGroup
          value={topicsLimit}
          exclusive
          onChange={onPerpage}
          aria-label="Platform">
          {limits.map(value => (
            <ToggleButton color="warning" key={value} value={value}>
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      }
    />
  )

  return (
    <div className={cn({ chesBackgrounded: true })}>
      <h1 hidden>Форум игры Шашки Чапаева</h1>
      <div className={cn('container')}>
        {tabsArr.map((tab, i) => (
          <input
            key={tab.split(' ').join('')}
            hidden
            type="radio"
            id={tab.split(' ').join('')}
            name="tab-control"
            defaultChecked={i === 0}
          />
        ))}
        <ul className={cn('forumNavigationList')}>
          {tabsArr.map(tab => {
            const tabHtmlAllias = tab.split(' ').join('')
            return (
              <li
                key={tabHtmlAllias}
                className={cn('forumNavigationItem')}
                title={tab}>
                <label
                  className={cn('forumNavigationItemLabel')}
                  htmlFor={tabHtmlAllias}
                  role="button">
                  <img
                    className={cn('tabPicture')}
                    alt={tab}
                    src={getImageUrl('../assets/' + tabHtmlAllias + '.svg')}
                  />
                  <span className={cn('forumNavigationItemLabelName')}>
                    {tab}
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
        <div className="slider">
          <div className="indicator"></div>
        </div>

        <div className="content">
          <section>{isLoad ? <Loader /> : <Topics />}</section>
          <section>
            <h2>{forumTabs.newTopic}</h2>
            <NewTopicForm />
          </section>
        </div>
      </div>
    </div>
  )
}

export default ForumDashboard
