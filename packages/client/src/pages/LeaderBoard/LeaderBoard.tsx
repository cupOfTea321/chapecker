import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { leadersMock } from './mock'
import back from '../../assets/chessboard-background.png'
import './leaderboard.scss'
import LeaderBox from './LeaderBox'
import { useLeadersMutation } from '../../redux/services/leaders'
import { setUserData } from '../../redux/features/userSlice'

const LeaderBoard: React.FC = () => {
  const [leader, leaderResult] = useLeadersMutation()
  const leaderList = async () => {
    try {
      leaderResult.data = await leader({
        ratingFieldName: 'otherField',
        cursor: 0,
        limit: 10,
      }).unwrap()
      setUserData(leaderResult.data)
      console.log(leaderResult)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    leaderList()
  }, [])
  return (
    <Box
      className={'container-leaderboards'}
      sx={{
        background: `url(${back})`,
      }}>
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
        {leaderResult?.data?.map((leader2, index) => {
          const leader = leader2.data
          console.log(leader)
          return (
            <LeaderBox
              key={`${leader.name}`}
              username={leader.name}
              score={leader.otherField}
              place={index + 1}
            />
          )
        })}
        {leadersMock.map((leader, index) => (
          <LeaderBox
            key={`${leader.username}`}
            avatar={leader.avatar}
            username={leader.username}
            displayName={leader.displayName}
            score={leader.score}
            place={index + 1}
          />
        ))}
      </Box>
    </Box>
  )
}

export default LeaderBoard
