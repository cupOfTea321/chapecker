import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'

import { yandexCoreApi } from './services/yandexCore.js'
import user from '../redux/features/userSlice'
import oauthservice from '../redux/features/oauthSlice.js'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
  configureStore({
    reducer: {
      [yandexCoreApi.reducerPath]: yandexCoreApi.reducer,
      user: user,
      oauthservice,
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
