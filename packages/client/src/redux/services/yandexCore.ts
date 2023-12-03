import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export interface cred {
  ratingFieldName: string
  cursor: number
  limit: number
}
export const yandexCoreApi = createApi({
  reducerPath: 'yandexCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2/',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      // const token = (getState() as RootState).user.token
      // console.log(token)
      console.log(getState())
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`)
      // }
      return headers
    },
    credentials: 'include',
  }),
  refetchOnMountOrArgChange: true,
  // добавляем необходимый поинт
  endpoints: builder => ({
    getUser: builder.query({
      query: () => `auth/user`,
    }),
  }),
})

// экспортируем заданные поинты как хуки
export const { useGetUserQuery } = yandexCoreApi
