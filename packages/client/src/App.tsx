import { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartScreen from './pages/StartScreen/StartScreen'

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
        <Routes>
          <Route path="/start" element={<StartScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
