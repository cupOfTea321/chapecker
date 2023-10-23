import { memo, useMemo } from 'react'
import NewTopicForm from './components/newTopicForm/newTopicForm'
import ForumPreviewTable from './components/forumPreviewTable/forumPreviewTable'

import bem from 'bem-ts'
import './style.scss'

import { forumTabs } from './model'
import { forums, forumsFree } from './components/forumPreviewTable/stubs'
import getImageUrl from '../../utils/getImageUrl'

const ForumDashboard = () => {
  const cn = bem('forumDashboard')
  const tabsArr = Object.values(forumTabs)

  const mainForums = useMemo(() => forums, [forums])
  const freeForums = useMemo(() => forumsFree, [forums])

  return (
    <div className={cn({ chesBackgrounded: true })}>
      <h1 hidden>Chapeaker forum</h1>
      <div className={cn('container')}>
        {tabsArr.map((tab, i) => (
          <input
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
            <ForumPreviewTable forums={mainForums} header="Main" />
            <ForumPreviewTable forums={freeForums} header="Free discussions" />
          </section>
          <section>
            <h2>{forumTabs.newTopic}</h2>
            <NewTopicForm />
          </section>
        </div>
      </div>
    </div>
  )
}

export default memo(ForumDashboard)
