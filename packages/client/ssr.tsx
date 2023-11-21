import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { ThemeProvider } from '@mui/material'
import { store } from './src/redux/store'
import { theme } from './src/mui'
import App from './src/App'

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </StaticRouter>
  )
}
