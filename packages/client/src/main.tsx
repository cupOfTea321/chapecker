
import { ThemeProvider } from '@mui/material'
import { theme } from './mui'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
)
