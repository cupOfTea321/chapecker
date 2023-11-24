import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { leadersMock } from './mock'
import back from '../../assets/chessboard-background.png'
import './leaderboard.scss'
import LeaderBox from './LeaderBox'
import { useLeadersMutation } from '../../redux/services/yandexCore'

const LeaderBoard: React.FC = () => {
  const [leader, { isLoading }] = useLeadersMutation()
  if (isLoading) return <div>Загрузка...</div>

  return (
    <Box
      className={'container-leaderboards'}
      sx={{
        background: `url(${back})`,
      }}>
      <Typography
        variant={'h1'}
        component={'h1'}
        onClick={() =>
          leader({
            ratingFieldName: 'otherField',
            cursor: 0,
            limit: 10,
          })
        }
        sx={{
          fontSize: '64px',
          textAlign: 'center',
          marginTop: '40px',
        }}>
        Лидеры
      </Typography>
      <Box className={'table-leaderboards'}>
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
