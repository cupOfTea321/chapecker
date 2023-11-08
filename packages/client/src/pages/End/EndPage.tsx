import React from 'react'
import { Box, Typography } from '@mui/material'
import MainButton from '../../components/MainButton'
import back from '../../assets/chessboard-background.png'
const EndPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: `url(${back})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      className={'container'}>
      <Typography
        variant={'h1'}
        component={'h1'}
        sx={{
          fontSize: '64px',
          textAlign: 'center',
          marginTop: '40px',
        }}>
        Игра закочена
      </Typography>
      <MainButton to={'/start'} text={'Продолжить'} />
      <MainButton to={'/'} text={'Главное меню'} />
    </Box>
  )
}

export default EndPage
