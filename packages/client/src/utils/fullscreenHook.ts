import { useCallback, useRef, useState, useEffect } from 'react'

function getFullscreenElement() {
  const _document = window.document as any

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
  const _element = element as any

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

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  const _ref = useRef()

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

  const ref = useCallback((element: null | undefined) => {
    if (element === null) {
      _ref.current = window.document.documentElement
    } else {
      _ref.current = element
    }
  }, [])

  useEffect(() => {
    if (!_ref.current && window.document) {
      _ref.current = window.document.documentElement
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
