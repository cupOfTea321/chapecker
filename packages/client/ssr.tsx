import React, { Suspense } from 'react'
import serialize from 'serialize-javascript'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { createStore } from './src/redux/store'
import App from './src/App'
import Spinner from './src/components/spinner/Spinner'

const store = createStore({})

export const renderHTML = async (url: string) => {
  return renderToString(
    <React.StrictMode>
      <Suspense fallback={<Spinner />}>
        <Provider store={store}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </Provider>
      </Suspense>
    </React.StrictMode>
  )
}

export const renderObject = (data: unknown) =>
  serialize(data).replace(/</g, '\\\u003c')
export const state = `<script type='module'>{window.__PRELOADED_SERVER_STATE__ = ${renderObject(
  store.getState()
)}}</script>`
