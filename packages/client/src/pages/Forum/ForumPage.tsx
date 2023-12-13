import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
  MouseEvent,
} from 'react'
import NewTopicForm from './components/newTopicForm/newTopicForm'
import ForumPreviewTable from './components/forumPreviewTable/forumPreviewTable'
import { forumTabs } from './model'
import getImageUrl from '../../utils/getImageUrl'
import { ToggleButtonGroup, ToggleButton, Pagination } from '@mui/material'
import { getTopics } from './actions'
import { useAppDispatch, useTypedSelector } from '../../redux/store'
import { getForumData, isForumDataLoad } from '../../redux/selectors'
import Spinner from '../../components/spinner/Spinner'
import {
  setTopics,
  load,
  setError,
  reload,
} from '../../redux/features/forumSlice'
import bem from 'bem-ts'
import './style.scss'

const ForumDashboard = () => {
  const cn = bem('forumDashboard')
  const dispatch = useAppDispatch()
  const tabsArr = Object.values(forumTabs)
  const limits = [10, 20, 30]
  const [topicsLimit, setTopicLimit] = useState(limits[0])
  const onPerpage = useCallback(
    (_event: MouseEvent<HTMLElement>, value: number) => setTopicLimit(value),
    []
  )
  const [topicsOffset, setOffset] = useState(0)

  const topics = useTypedSelector(getForumData)
  const isLoad = useTypedSelector(isForumDataLoad)
  const pages =
    topics.length === topicsLimit
      ? Math.ceil(topics.length / topicsLimit)
      : null
  const onPagination = useCallback(
    (_e: ChangeEvent<unknown>, page: number) => {
      setOffset(page)
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
        dispatch(setTopics(data))
      } catch (err) {
        setError(err)
      } finally {
        dispatch(load(false))
      }
    }
    if (topics === 'idle') {
      loadTopics()
    }
  }, [topics, load, topicsOffset])

  const Forum = () => (
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
          <section>
            <ForumPreviewTable
              forums={topics}
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
            {pages && (
              <Pagination
                onChange={onPagination}
                count={pages + 1}
                page={topicsOffset}
                variant="outlined"
                color="primary"
              />
            )}
          </section>
          <section>
            <h2>{forumTabs.newTopic}</h2>
            <NewTopicForm />
          </section>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {isLoad && <Spinner />}
      {!isLoad && <Forum />}
    </>
  )
}

export default memo(ForumDashboard)
