import React from 'react'
import { Box, Typography } from '@mui/material'
import './main.scss'
import { useNavigate } from 'react-router-dom'
const MainPage = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('start')
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        Шашки Чапаева
      </Typography>
      <Box
        component={'button'}
        className={'main-btn'}
        sx={{
          background: '#769656',
          border: '1px solid #f8f8f8',
          borderRadius: '20px',
          fontSize: '32px',
          padding: '5px 10px',
          marginTop: '20px',
          cursor: 'pointer',
        }}
        onClick={handleClick}>
        Начать игру
      </Box>
    </Box>
  )
}

export default MainPage
