import React from 'react'
import { Box, Typography } from '@mui/material'
import { leadersMock } from './mock'
import back from '../../assets/chessboard-background.png'
import './leaderboard.scss'
import LeaderBox from './LeaderBox'

const LeaderBoard: React.FC = () => (
  <Box
    className={'container-leaderboards'}
    sx={{
      background: `url(${back})`,
    }}>
    <Typography
      variant={'h1'}
      component={'h1'}
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
          key={`${leader.username}_${index}`}
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

export default LeaderBoard
