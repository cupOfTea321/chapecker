import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import avatar from '../../assets/user.png'
import './leaderboard.scss'
import LeaderBox from './LeaderBox'
import { useLeadersMutation } from '../../redux/services/leaders'

const LeaderBoard: React.FC = () => {
  const [leader, { data }] = useLeadersMutation()
  const leaderList = async () => {
    try {
      await leader({
        ratingFieldName: 'chapecker',
        cursor: 0,
        limit: 10,
      }).unwrap()
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    leaderList()
  }, [])

  return (
    <Box className={'container-leaderboards'}>
      <Typography
        variant={'h1'}
        component={'h1'}
        onClick={leaderList}
        sx={{
          fontSize: '64px',
          textAlign: 'center',
          marginTop: '40px',
        }}>
        Лидеры
      </Typography>
      <Box className={'table-leaderboards'}>
        {data?.map((leader2: any, index: number) => {
          const leader = leader2.data
          return (
            <LeaderBox
              key={`${leader.name}`}
              username={leader.name}
              avatar={leader.avatar ? leader.avatar : avatar}
              score={leader.chapecker}
              place={index + 1}
            />
          )
        })}
      </Box>
    </Box>
  )
}

export default LeaderBoard
