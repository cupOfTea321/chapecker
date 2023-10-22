import { memo, useRef } from 'react'

import bem from 'bem-ts'
import './styles.scss'

const AddMessageFrame = ({ inputName, onAddMessage }) => {
  const cn = bem('addMessageFrame')

  return (
    <div className={cn()}>
      <div>Admin</div>
      <form onSubmit={onAddMessage} className={cn('form')}>
        <label htmlFor="message" className={cn('label')}>
          <textarea
            name={inputName}
            className={cn('messageText')}
            title="wrtite message here"
            id="message"
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
