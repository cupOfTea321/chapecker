import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { newTopicFileds } from './model'
import { reload, load, setError } from '../../../../redux/features/forumSlice'
import { createTopic } from './actions'
import { useAppDispatch } from '../../../../redux/store'
import bem from 'bem-ts'
import './style.scss'

const NewTopicForm = () => {
  const cn = bem('newTopicForm')
  const dispatch = useAppDispatch()

  const [labelValue, setLabelValue] = useState('')
  const [decriptionValue, setDecriptionValue] = useState('')

  const handleLabelInput = useCallback((e: ChangeEvent) => {
    e.preventDefault()
    const newLabelValue = (e.target as HTMLInputElement).value
    setLabelValue(newLabelValue)
  }, [])

  const handleTopicDescriptionInput = useCallback((e: ChangeEvent) => {
    e.preventDefault()
    const newDecriptionValue = (e.target as HTMLInputElement).value
    setDecriptionValue(newDecriptionValue)
  }, [])

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
      dispatch(reload())
    } catch (err) {
      dispatch(setError(err))
    } finally {
      dispatch(load(false))
    }
  }, [])

  return (
    <form
      className={cn()}
      onSubmit={handleStartNewTopic}
      encType="multipart/form-data">
      <label className={cn('field')} htmlFor={newTopicFileds.label}>
        Тема: *
        <input
          type="text"
          name={newTopicFileds.label}
          className={cn('input')}
          id={newTopicFileds.label}
          onChange={handleLabelInput}
          value={labelValue}
          placeholder={newTopicFileds.label}
          required
          maxLength={150}
        />
        <span>* - до 150 знаков</span>
      </label>
      <label className={cn('field')} htmlFor={newTopicFileds.description}>
        Начальное сообщение:
        <textarea
          name={newTopicFileds.description}
          className={cn('topicText')}
          rows={5}
          cols={33}
          id={newTopicFileds.description}
          onChange={handleTopicDescriptionInput}
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

export default NewTopicForm
