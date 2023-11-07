import { useCallback, useRef, useState, useEffect } from 'react'

interface IDocument extends Document {
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
  webkitFullscreenElement?: Element
}

interface IHTMLElement extends HTMLElement {
  msRequestFullscreen?: () => Promise<void>
  mozRequestFullscreen?: () => Promise<void>
  webkitEnterFullscreen?: () => Promise<void>
  webkitRequestFullscreen?: () => Promise<void>
}

function getFullscreenElement() {
  const _document: IDocument = window.document

  const fullscreenElement =
    _document.fullscreenElement ||
    _document.webkitFullscreenElement ||
    _document.mozFullScreenElement ||
    _document.msFullscreenElement

  return fullscreenElement
}

function exitFullscreen() {
  const _document = window.document as any

  if (typeof _document.exitFullscreen === 'function')
    return _document.exitFullscreen()
  if (typeof _document.msExitFullscreen === 'function')
    return _document.msExitFullscreen()
  if (typeof _document.webkitExitFullscreen === 'function')
    return _document.webkitExitFullscreen()
  if (typeof _document.mozCancelFullScreen === 'function')
    return _document.mozCancelFullScreen()

  return null
}

function enterFullScreen(element: HTMLElement) {
  const _element = element as IHTMLElement

  return (
    _element.requestFullscreen?.() ||
    _element.msRequestFullscreen?.() ||
    _element.webkitEnterFullscreen?.() ||
    _element.webkitRequestFullscreen?.() ||
    _element.mozRequestFullscreen?.()
  )
}

const prefixes = ['', 'webkit', 'moz', 'ms']

function addEvents(
  element: HTMLElement,
  {
    onFullScreen,
    onError,
  }: { onFullScreen: (event: Event) => void; onError: (event: Event) => void }
) {
  prefixes.forEach(prefix => {
    element.addEventListener(`${prefix}fullscreenchange`, onFullScreen)
    element.addEventListener(`${prefix}fullscreenerror`, onError)
  })

  return () => {
    prefixes.forEach(prefix => {
      element.removeEventListener(`${prefix}fullscreenchange`, onFullScreen)
      element.removeEventListener(`${prefix}fullscreenerror`, onError)
    })
  }
}

export function useFullscreen<T extends HTMLElement = HTMLElement>() {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  const _ref = useRef<T>()

  const handleFullscreenChange = useCallback(
    (event: Event) => {
      setIsFullscreen(event.target === getFullscreenElement())
    },
    [setIsFullscreen]
  )

  const handleFullscreenError = useCallback(
    (event: Event) => {
      setIsFullscreen(false)
      // eslint-disable-next-line no-console
      console.error(`Ошибка вывода на полный экран: ${event} (${event.target})`)
    },
    [setIsFullscreen]
  )

  const toggleFullscreen = useCallback(() => {
    if (!getFullscreenElement()) {
      enterFullScreen(_ref.current!)
    } else {
      exitFullscreen()
    }
  }, [])

  const ref = useCallback((element: T | null) => {
    if (element === null) {
      _ref.current = window.document.documentElement as T
    } else {
      _ref.current = element
    }
  }, [])

  useEffect(() => {
    if (!_ref.current && window.document) {
      _ref.current = window.document.documentElement as T
      return addEvents(_ref.current, {
        onFullScreen: handleFullscreenChange,
        onError: handleFullscreenError,
      })
    }

    if (_ref.current) {
      return addEvents(_ref.current, {
        onFullScreen: handleFullscreenChange,
        onError: handleFullscreenError,
      })
    }

    return undefined
  }, [])

  return { isFullscreen, toggleFullscreen, ref } as const
}
