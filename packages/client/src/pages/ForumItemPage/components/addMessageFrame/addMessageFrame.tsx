import { FormEvent, memo } from 'react'
import { useTypedSelector } from '../../../../redux/store'
import { getUserData } from '../../../../redux/selectors'
import { IUser } from '../../../Profile/model'
import bem from 'bem-ts'
import './styles.scss'

type TAddMessageFrameProps = {
  inputName: string
  onAddMessage: (e: FormEvent) => void
  label: string
  close?: () => void
  isDisabled: boolean
}

const AddMessageFrame = ({
  inputName,
  onAddMessage,
  label,
  close,
  isDisabled,
}: TAddMessageFrameProps) => {
  const cn = bem('addMessageFrame')
  const { first_name, second_name } = useTypedSelector(getUserData) as IUser
  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <div>{first_name + ' ' + second_name}</div>
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
