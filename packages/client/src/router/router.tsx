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

export const publilRoutes = {
  signUp: { path: '/signup', element: <SignUpPage />, nodeRef: createRef() },
  login: { path: '/login', element: <LoginPage />, nodeRef: createRef() },
  error404: { path: '/404', element: <Error404 />, nodeRef: createRef() },
  error500: { path: '/500', element: <Error500 />, nodeRef: createRef() },
  noMatch: {
    path: '*',
    element: <Error404 />,
    nodeRef: createRef(),
  },
}

export const privateRoutes = {
  mainPage: { path: '/', element: <MainPage />, nodeRef: createRef() },
  startScreen: {
    path: '/start',
    element: <StartScreen />,
    nodeRef: createRef(),
  },
  profile: { path: '/profile', element: <ProfilePage />, nodeRef: createRef() },
  board: { path: '/board', element: <LeaderBoard />, nodeRef: createRef() },
  user: { path: '/user', element: <UserPage />, nodeRef: createRef() },
  forum: { path: '/forum', element: <ForumPage />, nodeRef: createRef() },
  forumItem: {
    path: '/forum/:id',
    element: <ForumItemPage />,
    nodeRef: createRef(),
  },
  end: { path: '/end', element: <EndPage />, nodeRef: createRef() },
  game: { path: '/game', element: <GamePage />, nodeRef: createRef() },
  error505: { path: '/505', element: <Error500 />, nodeRef: createRef() },
}

export const getAllRoutes = () => {
  const publicArray = Object.values(publilRoutes)
  const protectedArray = Object.values(privateRoutes)
  return publicArray.concat(protectedArray)
}
