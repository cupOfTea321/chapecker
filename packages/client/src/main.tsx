import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { theme } from './mui'
import App from './App'
import { RootState, createStore } from './redux/store.js'
import './index.scss'
import './styles/index.css'
import Spinner from './components/spinner/Spinner'

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

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Suspense>
  </React.StrictMode>
)

declare global {
  interface Window {
    __PRELOADED_SERVER_STATE__?: RootState
  }
}
