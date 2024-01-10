import { Box, Typography } from '@mui/material'
import MainButton from '../../components/main/MainButton'
import { protectedRoutes } from '../../constants/browserRoutes'
import LogoutButton from '../../components/LogoutButton/logoutButton'
import ThreeDBox from '../../containers/MotionLayer/ThreeDBox'

const { startScreen, board, profile, forum } = protectedRoutes

const MainPage = () => (
  <ThreeDBox>
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        margin: 'auto',
      }}>
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
      <MainButton to={startScreen} text={'Начать игру'} />
      <MainButton to={board} text={'Таблица лидеров'} />
      <MainButton to={forum} text={'Форум'} />
      <MainButton to={profile} text={'Профиль'} />
      <LogoutButton />
    </Box>
  </ThreeDBox>
)

export default MainPage
