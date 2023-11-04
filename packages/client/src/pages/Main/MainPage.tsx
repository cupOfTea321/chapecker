import React from 'react'
import { useGetUserQuery } from '../../redux/services/yandexCore'
import { useAppDispatch } from '../../redux/store'
import { getUser } from '../../redux/features/userSlice'

const MainPage = () => {
  const { data, isFetching } = useGetUserQuery(1)
  const dispatch = useAppDispatch()
  // console.log(dispatch)

  if (!isFetching) return <div>загрузка</div>
  const user = getUser()
  console.log(user)
  console.log(data)

  return <div>MainPage</div>
}

export default MainPage
