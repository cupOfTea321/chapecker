import { FormEvent, memo } from 'react'
import { IUser } from '../../../Profile/model'
import bem from 'bem-ts'
import './styles.scss'

type TAddMessageFrameProps = {
  inputName: string
  onAddMessage: (e: FormEvent) => void
  label: string
  user: IUser
  close?: () => void
  isDisabled: boolean
}

const AddMessageFrame = ({
  inputName,
  onAddMessage,
  label,
  user,
  close,
  isDisabled,
}: TAddMessageFrameProps) => {
  const cn = bem('addMessageFrame')

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <div>{user.first_name + ' ' + user.second_name}</div>
        {close && (
          <span onClick={close} className={cn('headerClose')}>
            Закрыть
          </span>
        )}
      </div>
      <form onSubmit={onAddMessage} className={cn('form')}>
        <label htmlFor={inputName} className={cn('label')}>
          {label}
          <textarea
            name={inputName}
            className={cn('messageText')}
            title="Поле для ввода текста сообщения"
            id={inputName}
            required
            maxLength={450}
            disabled={isDisabled}
          />
        </label>
        <input
          className={cn('button', { submit: true })}
          type="submit"
          readOnly
          disabled={isDisabled}
        />
      </form>
    </div>
  )
}

export default memo(AddMessageFrame)
