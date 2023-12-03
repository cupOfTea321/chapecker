import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { publilRoutes, privateRoutes } from './router/router'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const { login, signUp, error404, noMatch } = publilRoutes

// function debugClick() {
//   axios({
//     url: 'http://localhost:3001/api/forum/topic',
//     method: 'POST',
//     withCredentials: true,
//     headers: { 'Content-type': 'application/json; charset=UTF-8' },
//     data: JSON.stringify({title: 'Создано с HTTP'})
//   })
// }

function App() {
  return (
    <div className="App">
      {/* <button style={{position: 'fixed', top: '200px', left: '100px', right: '100px', bottom: '200px', zIndex: '8000'}}
        onClick={debugClick}>CLICK</button> */}
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
