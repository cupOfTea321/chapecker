import React from 'react'
import { Box, Typography } from '@mui/material'
import './main.scss'
import MainButton from '../../components/main/MainButton'
import back from '../../assets/chessboard-background.png'

const MainPage = () => {
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
        Шашки Чапаева
      </Typography>
      <MainButton to={'start'} text={'Начать игру'} />
      <MainButton to={'board'} text={'Таблица лидеров'} />
      <MainButton to={'profile'} text={'Профиль'} />
      <MainButton to={'forum'} text={'Форум'} />
      <Typography
        variant={'h2'}
        component={'h2'}
        sx={{
          fontSize: '42px',
          textAlign: 'center',
          marginTop: { sm: '40px', xs: '20px' },
        }}>
        Игровой процесс
      </Typography>
      <Typography
        variant={'h4'}
        component={'h4'}
        sx={{
          fontSize: '18px',
          textAlign: 'center',
          marginTop: { sm: '20px', xs: '10px' },
          width: { sm: '60%', xs: '90%' },
          marginBottom: { sm: '20px', xs: '40px' },
        }}>
        Играет 2 игрока — один за "белых", второй за "черных". В начале партии
        на шахмтной доске 8x8 в первом ряду располагается 8 белых фишек, в
        восьмом ряду — 8 черных фишек Каждый из игроков, начиная с игрока за
        "белых", по очереди проделывает следующие действия в указанной
        последовательности:
        <br /> <br />
        Выбирает фишку, которой будет ходить
        <br />
        Указывает направление, в котором полетит фишка
        <br />
        Указывает силу, с которой будет брошена фишка
        <br />
        <br />
        После этого выбранная фишка бросается в указанном направлении с
        указанной силой. Она соударется с другими фишками и может выкинуть их за
        пределы игрового поля. Когда все фишки остановились, ход переходит
        следующему игроку Игра продолжается до тех пор, пока все фишки хотя бы
        одного из игроков не окажутся выбитыми за пределы игрового поля.
        Победителем считается игрок, сделавший последний ход.
      </Typography>
    </Box>
  )
}

export default MainPage
