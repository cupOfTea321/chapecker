import { memo } from 'react'
import NewTopicForm from '../../components/newTopicForm/newTopicForm'

import bem from 'bem-ts'
import './style.scss'

import { forumTabs } from './model'

const ForumDashboard = () => {
  const cn = bem('forumDashboard')
  const tabsArr = Object.values(forumTabs)

  return (
    <div className={cn({ chesBackgrounded: true })}>
      <h1 hidden>Chapeaker forum</h1>
      <div className={cn('container')}>
        <input
          hidden
          type="radio"
          id={forumTabs.allTopics.split(' ').join('')}
          name="tab-control"
          defaultChecked
        />
        <input
          hidden
          type="radio"
          id={forumTabs.newTopic.split(' ').join('')}
          name="tab-control"
        />
        <ul className={cn('forumNavigationList')}>
          {tabsArr.map(tab => (
            <li
              key={tab.split(' ').join('')}
              className={cn('forumNavigationItem')}
              title={tab}>
              <label
                className={cn('forumNavigationItemLabel')}
                htmlFor={tab.split(' ').join('')}
                role="button">
                <span className={cn('forumNavigationItemLabelName')}>
                  {tab}
                </span>
              </label>
            </li>
          ))}
        </ul>
        <div className="slider">
          <div className="indicator"></div>
        </div>

        <div className="content">
          <section>
            <h2>{forumTabs.allTopics}</h2>
            <div></div>
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
