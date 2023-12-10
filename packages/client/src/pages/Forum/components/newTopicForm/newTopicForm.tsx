import { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react'
import { newTopicFileds } from './model'

import bem from 'bem-ts'
import './style.scss'
import { createTopic } from './actions'

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
      const data: { [x: string]: unknown } = {}
      for (const [key, value] of new FormData(
        e.target as HTMLFormElement
      ).entries()) {
        data[key] = value
      }
      console.log(data)
      createTopic(data)
    }, []),
  }

  return (
    <form
      className={cn()}
      onSubmit={callbacks.handleStartNewTopic}
      encType="multipart/form-data">
      <label className={cn('field')} htmlFor={newTopicFileds.label}>
        Тема: *
        <input
          type="text"
          name={newTopicFileds.label}
          className={cn('input')}
          id={newTopicFileds.label}
          onChange={callbacks.handleLabelInput}
          value={labelValue}
          placeholder={newTopicFileds.label}
          required
          maxLength={150}
        />
        <span>* - до 150 знаков</span>
      </label>
      <label className={cn('field')} htmlFor={newTopicFileds.media}>
        <span className={cn('itemUpload', { ordinar: true })}>
          Загрузить картинку
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
        Начальное сообщение:
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
      <label className={cn('field')}>
        <input
          type="submit"
          className={cn('button', { ordinar: true })}
          value="Создать топик"
        />
      </label>
    </form>
  )
}

export default memo(NewTopicForm)
