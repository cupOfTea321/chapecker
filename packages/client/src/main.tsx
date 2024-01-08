import React, { Suspense } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import { RootState, createStore } from './redux/store.js'
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

const container = document.getElementById('root') as HTMLElement

const Bundle = () => (
  <Suspense fallback={<Spinner />}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>
)

if (import.meta.hot) {
  createRoot(container as HTMLElement).render(<Bundle />)
} else {
  console.log('hydrate')
  hydrateRoot(container as HTMLElement, <Bundle />)
}
declare global {
  interface Window {
    __PRELOADED_SERVER_STATE__?: RootState
  }
}

if ('serviceWorker' in navigator) {
  if (!import.meta.env.DEV) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then(() => {
          console.log('Service worker registered')
        })
    })
  } else {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (const registration of registrations) {
        registration.unregister().then(() => {
          console.log('Service worker unregistered')
        })
      }
    })
  }
}
