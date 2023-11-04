import { createRef } from 'react'
import {
  MainPage,
  StartScreen,
  LoginPage,
  SignUpPage,
  ProfilePage,
  LeaderBoard,
  UserPage,
  ForumPage,
  ForumItemPage,
  EndPage,
  GamePage,
  Error500,
  Error404,
} from '../pages'
import { Navigate } from 'react-router-dom'

export const routes = [
  { path: '/', element: <MainPage />, nodeRef: createRef() },
  { path: '/start', element: <StartScreen />, nodeRef: createRef() },
  { path: '/signup', element: <SignUpPage />, nodeRef: createRef() },
  { path: '/login', element: <LoginPage />, nodeRef: createRef() },
  { path: '/profile', element: <ProfilePage />, nodeRef: createRef() },
  { path: '/board', element: <LeaderBoard />, nodeRef: createRef() },
  { path: '/user', element: <UserPage />, nodeRef: createRef() },
  { path: '/forum', element: <ForumPage />, nodeRef: createRef() },
  { path: '/forum/:id', element: <ForumItemPage />, nodeRef: createRef() },
  { path: '/end', element: <EndPage />, nodeRef: createRef() },
  { path: '/game', element: <GamePage />, nodeRef: createRef() },
  { path: '/500', element: <Error500 />, nodeRef: createRef() },
  { path: '/404', element: <Error404 />, nodeRef: createRef() },
  { path: '*', element: <Navigate to="/404" replace />, nodeRef: createRef() },
]
