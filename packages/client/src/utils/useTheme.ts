import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

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
