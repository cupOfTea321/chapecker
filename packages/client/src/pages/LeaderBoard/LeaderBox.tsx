import React from 'react'
import { Box } from '@mui/material'
import './leaderboard.scss'

interface IBlockLeader {
  avatar: string
  username: string
  displayName: string
  score: number | undefined
  place: number
}

const LeaderBox: React.FC<IBlockLeader> = ({
  avatar,
  displayName,
  username,
  score,
}) => {
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

export default LeaderBox
