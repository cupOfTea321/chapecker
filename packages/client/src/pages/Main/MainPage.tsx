import React from 'react'
import { useGetUserQuery } from '../../redux/services/yandexCore'
import { getUser } from '../../redux/features/userSlice'

const MainPage = () => {
  const { data, isFetching } = useGetUserQuery(1)

  if (!isFetching) return <div>загрузка</div>
  const user = getUser()
  console.log(user)
  console.log(data)

  return <div>MainPage</div>
}

export default MainPage
