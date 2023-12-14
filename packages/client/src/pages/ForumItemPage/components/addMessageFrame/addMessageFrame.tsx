import { FormEvent, memo } from 'react'

import bem from 'bem-ts'
import './styles.scss'
import { useTypedSelector } from '../../../../redux/store'
import { getUserData } from '../../../../redux/selectors'
import { IUser } from '../../../Profile/model'

type TAddMessageFrameProps = {
  inputName: string
  onAddMessage: (e: FormEvent) => void
  isDisabled: boolean
}

const AddMessageFrame = ({
  inputName,
  onAddMessage,
  isDisabled,
}: TAddMessageFrameProps) => {
  const cn = bem('addMessageFrame')
  const { display_name } = useTypedSelector(getUserData) as IUser
  return (
    <div className={cn()}>
      <div>{display_name}</div>
      <form onSubmit={onAddMessage} className={cn('form')}>
        <label htmlFor={inputName} className={cn('label')}>
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
