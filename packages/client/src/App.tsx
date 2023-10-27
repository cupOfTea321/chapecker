import './App.scss'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './router/router'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
