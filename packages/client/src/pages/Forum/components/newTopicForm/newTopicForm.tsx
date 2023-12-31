import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { newTopicFileds } from './model'
import bem from 'bem-ts'
import './style.scss'

const NewTopicForm = ({
  onNewTopic,
}: {
  onNewTopic: (e: FormEvent) => Promise<void>
}) => {
  const cn = bem('newTopicForm')
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

  return (
    <form className={cn()} onSubmit={onNewTopic} encType="multipart/form-data">
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
