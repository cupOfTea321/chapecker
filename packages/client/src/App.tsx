import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { publilRoutes, privateRoutes } from './router/router'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { useTheme } from './utils/useTheme'

const { login, signUp, error404, noMatch } = publilRoutes

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`App ${theme}`}>
      <h1>👋 Howdy from the server :)</h1>
      <ErrorBoundary>
        <Routes>
          <Route
            path={privateRoutes.mainPage.path}
            element={<ProtectedRoute />}>
            {Object.values(privateRoutes).map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
          <Route path={login.path} element={login.element} />
          <Route path={signUp.path} element={signUp.element} />
          <Route path={error404.path} element={error404.element} />
          <Route path={noMatch.path} element={noMatch.element} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App
