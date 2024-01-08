export const protectedRoutes = {
  main: '/',
  startScreen: '/start',
  profile: '/profile',
  board: '/board',
  forum: '/forum',
  forumItem: '/forum/:id',
  endScreen: '/end',
  game: '/game',
  aboutGame: '/rules',
  error505: '/505',
}

export const publicRoutes = {
  signUp: '/signup',
  login: '/login',
  error404: '/404',
  error500: '/500',
  noMatch: '*',
}
