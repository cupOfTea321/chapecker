import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  MouseEvent,
  useMemo,
  FormEvent,
} from 'react'
import NewTopicForm from './components/newTopicForm/newTopicForm'
import ForumPreviewTable from './components/forumPreviewTable/forumPreviewTable'
import { forumTabs } from './model'
import {
  ToggleButtonGroup,
  ToggleButton,
  Pagination,
  Box,
  Tabs,
  Tab,
} from '@mui/material'
import { createTopic, getTopics, getTopicsCount } from './actions'
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
import Loader from '../../components/loader/loader'
import {
  IDLE,
  INIT_OFFSET,
  INIT_TAB_VALUE_INDEX,
  itemsLimits,
} from '../../constants/forumConstants'
import CustomTabPanel from './components/tabPanel/tabPanel'
import AddCommentIcon from '@mui/icons-material/AddComment'
import ListIcon from '@mui/icons-material/List'
import bem from 'bem-ts'
import './style.scss'

const ForumDashboard = () => {
  const cn = bem('forumDashboard')
  const dispatch = useAppDispatch()
  const tabsArr = Object.values(forumTabs)
  const limits = useMemo(() => itemsLimits, [itemsLimits])
  const [page, setPage] = useState(1)
  const [topicsLimit, setTopicLimit] = useState<number>(limits[0])
  const [topicsOffset, setOffset] = useState(INIT_OFFSET)
  const topics = useTypedSelector(getForumData)
  const topicsCounts = useTypedSelector(getTopicsCounts)
  const isLoad = useTypedSelector(isForumDataLoad)
  const pages = topicsCounts > 0 ? Math.ceil(topicsCounts / topicsLimit) : null
  const a11yProps = (index: number) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    }
  }
  const [tabTalue, setTabValue] = useState(INIT_TAB_VALUE_INDEX)
  const handleTabChange = useCallback(
    (_e: React.SyntheticEvent, newValue: number) => setTabValue(newValue),
    []
  )

  const handleStartNewTopic = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    const data: { [x: string]: unknown } = {}
    for (const [key, value] of new FormData(
      e.target as HTMLFormElement
    ).entries()) {
      data[key] = value
    }
    try {
      dispatch(load(true))
      await createTopic(data)
      ;(e.target as HTMLFormElement).reset()
      setTabValue(INIT_TAB_VALUE_INDEX)
      dispatch(reload())
    } catch (err) {
      dispatch(setError(err))
    } finally {
      dispatch(load(false))
    }
  }, [])

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
    if (topics === IDLE) {
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
    <Box className={cn({ chesBackgrounded: true })}>
      <Box className={cn('container')}>
        <Tabs
          className={cn('forumNavigationList')}
          value={tabTalue}
          onChange={handleTabChange}
          aria-label="tabs">
          {tabsArr.map((tabName, i) => (
            <Tab
              icon={
                tabName === forumTabs.allTopics ? (
                  <ListIcon />
                ) : (
                  <AddCommentIcon />
                )
              }
              iconPosition="start"
              key={tabName}
              className={cn('forumNavigationItem')}
              label={tabName}
              {...a11yProps(i)}
            />
          ))}
        </Tabs>
        <CustomTabPanel value={tabTalue} index={0}>
          <h2 hidden>{forumTabs.allTopics}</h2>
          {isLoad ? <Loader /> : <Topics />}
        </CustomTabPanel>
        <CustomTabPanel value={tabTalue} index={1}>
          <h2 hidden>{forumTabs.newTopic}</h2>
          <NewTopicForm onNewTopic={handleStartNewTopic} />
        </CustomTabPanel>
      </Box>
    </Box>
  )
}

export default ForumDashboard
