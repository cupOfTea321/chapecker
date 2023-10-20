import { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react'
import { newTopicFileds } from './model'

import bem from 'bem-ts'
import './style.scss'

const NewTopicForm = () => {
  const cn = bem('newTopicForm')

  const [labelValue, setLabelValue] = useState('')
  const [decriptionValue, setDecriptionValue] = useState('')

  const callbacks = {
    handleLabelInput: useCallback((e: ChangeEvent) => {
      e.preventDefault()
      const newLabelValue = (e.target as HTMLInputElement).value
      setLabelValue(newLabelValue)
    }, []),
    handleTopicAvatInput: useCallback((e: ChangeEvent) => {
      e.preventDefault()
      // logic of adding topic avatar
    }, []),
    handleTopicDescriptionInput: useCallback((e: ChangeEvent) => {
      e.preventDefault()
      const newDecriptionValue = (e.target as HTMLInputElement).value
      setDecriptionValue(newDecriptionValue)
    }, []),
    handleStartNewTopic: useCallback((e: FormEvent) => {
      e.preventDefault()
      const data = new FormData(e.target as HTMLFormElement)
      console.log(data)
      // logic of adding new topic
    }, []),
  }

  return (
    <form
      className={cn()}
      onSubmit={callbacks.handleStartNewTopic}
      encType="multipart/form-data">
      <label className={cn('field')} htmlFor={newTopicFileds.label}>
        Topic theme:
        <input
          type="text"
          name={newTopicFileds.label}
          className={cn('input')}
          id={newTopicFileds.label}
          onChange={callbacks.handleLabelInput}
          value={labelValue}
          placeholder={newTopicFileds.label}
        />
      </label>
      <label className={cn('field')} htmlFor={newTopicFileds.media}>
        <span className={cn('itemUpload', { ordinar: true })}>
          Upload topic media
        </span>
        <input
          type="file"
          name={newTopicFileds.media}
          className={cn('input', { hidden: true })}
          id={newTopicFileds.media}
          onChange={callbacks.handleTopicAvatInput}
          placeholder={newTopicFileds.media}
        />
      </label>
      <label className={cn('field')} htmlFor={newTopicFileds.description}>
        Enter topic description here:
        <textarea
          name={newTopicFileds.description}
          className={cn('topicText')}
          rows={5}
          cols={33}
          id={newTopicFileds.description}
          onChange={callbacks.handleTopicDescriptionInput}
          value={decriptionValue}
          placeholder={newTopicFileds.description}
        />
      </label>
      <button className={cn('button', { ordinar: true })}>Start topic</button>
    </form>
  )
}

export default memo(NewTopicForm)
