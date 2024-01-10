import { createRef } from 'react'
import {
  MainPage,
  StartScreen,
  LoginPage,
  SignUpPage,
  ProfilePage,
  LeaderBoard,
  ForumPage,
  ForumItemPage,
  EndPage,
  GamePage,
  Error500,
  Error404,
} from '../pages'
import { protectedRoutes, publicRoutes } from '../constants/browserRoutes'

const {
  main,
  startScreen,
  profile,
  board,
  forum,
  forumItem,
  game,
  error505,
  endScreen,
} = protectedRoutes
const { signUp, login, error404, error500, noMatch } = publicRoutes

export const publilRoutes = {
  signUp: { path: signUp, element: <SignUpPage />, nodeRef: createRef() },
  login: { path: login, element: <LoginPage />, nodeRef: createRef() },
  error404: { path: error404, element: <Error404 />, nodeRef: createRef() },
  error500: { path: error500, element: <Error500 />, nodeRef: createRef() },
  noMatch: {
    path: noMatch,
    element: <Error404 />,
    nodeRef: createRef(),
  },
}

export const privateRoutes = {
  mainPage: { path: main, element: <MainPage />, nodeRef: createRef() },
  startScreen: {
    path: startScreen,
    element: <StartScreen />,
    nodeRef: createRef(),
  },
  profile: { path: profile, element: <ProfilePage />, nodeRef: createRef() },
  board: { path: board, element: <LeaderBoard />, nodeRef: createRef() },
  forum: { path: forum, element: <ForumPage />, nodeRef: createRef() },
  forumItem: {
    path: forumItem,
    element: <ForumItemPage />,
    nodeRef: createRef(),
  },
  end: { path: endScreen, element: <EndPage />, nodeRef: createRef() },
  game: { path: game, element: <GamePage />, nodeRef: createRef() },
  error505: { path: error505, element: <Error500 />, nodeRef: createRef() },
}

export const getAllRoutes = () => {
  const publicArray = Object.values(publilRoutes)
  const protectedArray = Object.values(privateRoutes)
  return publicArray.concat(protectedArray)
}
