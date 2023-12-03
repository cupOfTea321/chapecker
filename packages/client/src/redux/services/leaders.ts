import { cred, yandexCoreApi } from './yandexCore'

export const leadersApi = yandexCoreApi.injectEndpoints({
  endpoints: builder => ({
    leaders: builder.mutation({
      query: (credentials: cred) => ({
        url: `leaderboard/all`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

// экспортируем заданные поинты как хуки
export const { useLeadersMutation } = leadersApi

export const {
  endpoints: { leaders },
} = leadersApi
