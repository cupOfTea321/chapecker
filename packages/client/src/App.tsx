import './App.scss'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './router/router'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

function App() {
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
