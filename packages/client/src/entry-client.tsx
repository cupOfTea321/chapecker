import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { theme } from './mui'
import App from './App'
import { RootState, createStore } from './redux/store.js'
import './index.scss'
import './styles/index.css'

const loadServerState = () => {
  if (typeof window.__PRELOADED_SERVER_STATE__ === 'object') {
    const state = window.__PRELOADED_SERVER_STATE__
    delete window.__PRELOADED_SERVER_STATE__
    return state
  }
  return {}
}
typeof window.__PRELOADED_SERVER_STATE__ === 'object'
  ? window.__PRELOADED_SERVER_STATE__
  : {}

export const store = createStore({ preloadedState: loadServerState() })

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

declare global {
  interface Window {
    __PRELOADED_SERVER_STATE__?: RootState
  }
}
