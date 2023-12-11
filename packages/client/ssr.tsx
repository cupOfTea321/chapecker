import React, { Suspense } from 'react'
import serialize from 'serialize-javascript'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { ThemeProvider } from '@mui/material'
import { createStore } from './src/redux/store'
import { theme } from './src/mui'
import App from './src/App'
import Spinner from './src/components/spinner/Spinner'
import axios from 'axios'
import { userInfoURL } from './src/API/endpoints'
import { setUserData } from './src/redux/features/userSlice'

const store = createStore({})

export const renderHTML = async (url: string, cookies) => {
  const user = await getUserData(cookies)
  store.dispatch(setUserData(user))

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
const getUserData = async (cookies: Record<string, string>) => {
  if (cookies && cookies.authCookie) {
    return axios({
      method: 'GET',
      headers: { Cookie: `authCookie=${cookies.authCookie};` },
      url: userInfoURL,
    })
  }
  return {}
}
