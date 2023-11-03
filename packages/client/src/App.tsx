import { useEffect } from 'react'
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './router/router'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  )
}

export default App
