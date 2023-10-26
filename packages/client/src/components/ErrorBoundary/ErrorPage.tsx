import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { IError } from './model'

import bem from 'bem-ts'
import './styles.scss'

const ErrorPage = ({ error }: { error?: IError }) => {
  const navigate = useNavigate()

  const callbacks = {
    onBack: useCallback(() => navigate(-1), []),
    onCopyErrorMessage: useCallback(
      async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!error) return
        await navigator.clipboard.writeText(error && error.message)
        ;(e.target as HTMLButtonElement).textContent = 'copied'
      },
      [error]
    ),
    onCopyErrorStack: useCallback(
      async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!error) return
        await navigator.clipboard.writeText(error && error.errorStack)
        ;(e.target as HTMLButtonElement).textContent = 'copied'
      },
      [error]
    ),
  }

  const text = 'Something went wrong...'
  const errorMessage = 'Error message: '
  const errorStack = 'Error stack: '
  const cn = bem('errorPage')

  return (
    <div className={cn()}>
      <h1>{text}</h1>
      <div className={cn('errorContainer')}>
        <span>
          {errorMessage}
          {error && error.message}
        </span>
        <label htmlFor="copy">
          <button
            className={cn('copyButton')}
            onClick={callbacks.onCopyErrorMessage}
            id="copy">
            copy
          </button>
        </label>
      </div>
      <div className={cn('errorContainer')}>
        <span className={cn('errorStack')}>
          {errorStack}
          {error && error.errorStack}
        </span>
        <label htmlFor="copy">
          <button
            className={cn('copyButton')}
            onClick={callbacks.onCopyErrorStack}
            id="copy">
            copy
          </button>
        </label>
      </div>
      <a
        className={cn('reportIssue')}
        href="https://github.com/cupOfTea321/chapecker/issues/new">
        Report a bug via Github
      </a>
      <button
        className={cn('backButton')}
        type="button"
        onClick={callbacks.onBack}>
        Back
      </button>
    </div>
  )
}

export default ErrorPage
