import { FormEvent, memo } from 'react'

import bem from 'bem-ts'
import './styles.scss'

type TAddMessageFrameProps = {
  inputName: string
  onAddMessage: (e: FormEvent) => void
  name: string
}

const AddMessageFrame = ({
  inputName,
  onAddMessage,
  name = 'Admin',
}: TAddMessageFrameProps) => {
  const cn = bem('addMessageFrame')

  return (
    <div className={cn()}>
      <div>{name}</div>
      <form onSubmit={onAddMessage} className={cn('form')}>
        <label htmlFor={inputName} className={cn('label')}>
          <textarea
            name={inputName}
            className={cn('messageText')}
            title="Поле для ввода текста сообщения"
            id={inputName}
            required
            maxLength={450}
          />
        </label>
        <input
          className={cn('button', { submit: true })}
          type="submit"
          readOnly
        />
      </form>
    </div>
  )
}

export default memo(AddMessageFrame)
