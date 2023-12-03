import { yandexCoreApi } from './yandexCore'
export interface cred {
  ratingFieldName: string
  cursor: number
  limit: number
}

export const leadersApi = yandexCoreApi.injectEndpoints({
  endpoints: builder => ({
    leaders: builder.mutation({
      query: (credentials: cred) => ({
        url: `leaderboard/all`,
        method: 'POST',
        body: credentials,
      }),
    }),
    addLeader: builder.mutation({
      query: (credentials: cred) => ({
        url: `leaderboard`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

// экспортируем заданные поинты как хуки
export const { useLeadersMutation, useAddLeaderMutation } = leadersApi

export const {
  endpoints: { leaders, addLeader },
} = leadersApi
