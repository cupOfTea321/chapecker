import React from 'react'
import { Box, Typography } from '@mui/material'
import { leadersMock } from './mock'
import back from '../../assets/chessboard-background.png'
import './leaderboard.scss'

interface IBlockLeader {
  avatar: string
  username: string
  displayName: string
  score: number | undefined
  place: number
}

const LeaderBox: React.FC<IBlockLeader> = (props: IBlockLeader) => {
  const { avatar, displayName, username, score } = props

  return (
    <Box className={'container-leaderbox'}>
      <Box className={'container-leaderbox__left'}>
        <Box className={'container-leaderbox__avatar'}>
          <img src={avatar} alt="avatar" />
        </Box>
        <Box>
          <Box>{displayName}</Box>
          <small className="text-muted">{username}</small>
        </Box>
      </Box>
      <Box className={'container-leaderbox__right'}>{score}</Box>
    </Box>
  )
}

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
      {leadersMock.map((leader, index) => {
        // Исходи из того что лидеры уже отсортированы на бэке по очкам
        const currentPlace = index + 1

        return (
          <LeaderBox
            key={index}
            avatar={leader.avatar}
            username={leader.username}
            displayName={leader.displayName}
            score={leader.score}
            place={currentPlace}
          />
        )
      })}
    </Box>
  </Box>
)

export default LeaderBoard
