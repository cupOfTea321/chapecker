import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'

import { yandexCoreApi } from './services/yandexCore.js'
import user from './features/userSlice'
import oauthservice from './features/oauthSlice'
import forum from './features/forumSlice'
import topic from './features/topicSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
  configureStore({
    reducer: {
      [yandexCoreApi.reducerPath]: yandexCoreApi.reducer,
      user,
      oauthservice,
      forum,
      topic,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(yandexCoreApi.middleware),
    ...options,
  })

export const store = createStore()
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
