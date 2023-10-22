import { useEffect } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getForumPath } from './routes'

import ForumDashBoard from './pages/forumDashBoard/forums'
import ForumPage from './pages/forumPage/forumPage'

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
    <BrowserRouter>
      <Routes>
        <Route index path={getForumPath()} element={<ForumDashBoard />} />
        <Route path="/forum/:id" element={<ForumPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
