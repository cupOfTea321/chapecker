import { useCallback } from 'react'
import { useLocalStorage } from '@uidotdev/usehooks'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('themeValue', 'light')

  const toggleTheme = useCallback(() => {
    setTheme(lastValue => {
      if (lastValue === 'light') {
        return 'dark'
      }
      return 'light'
    })
  }, [theme, setTheme])

  return {
    theme,
    setTheme,
    toggleTheme,
  }
}
