import React from 'react'
import { Box, Typography } from '@mui/material'
import MainButton from '../../components/MainButton'
import { protectedRoutes } from '../../constants/browserRoutes'
import ThreeDBox from '../../containers/MotionLayer/ThreeDBox'

const { main, startScreen } = protectedRoutes

const EndPage = () => (
  <ThreeDBox>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: ' center',
        minHeight: '95vh',
      }}>
      <Typography
        color="white"
        variant={'h1'}
        component={'h1'}
        sx={{
          fontSize: '64px',
          textAlign: 'center',
          marginTop: '40px',
        }}>
        Игра закочена
      </Typography>
      <MainButton to={startScreen} text={'Продолжить'} />
      <MainButton to={main} text={'Главное меню'} />
    </Box>
  </ThreeDBox>
)

export default EndPage
