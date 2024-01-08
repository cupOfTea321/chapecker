import { useCallback } from 'react'
import { logOut } from './actions'
import { useNavigate } from 'react-router-dom'
import { publilRoutes } from '../../router/router'
import { Box } from '@mui/material'
import './styles.scss'

const LogoutButton = () => {
  const navigate = useNavigate()

  const onLogout = useCallback(async () => {
    try {
      await logOut()
      navigate(publilRoutes.login.path)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <Box
      onClick={onLogout}
      component="button"
      type="button"
      className={'logoutButton'}
      sx={{
        border: '1px solid #f8f8f8',
        borderRadius: '20px',
        fontSize: { sm: '32px', xs: '20px' },
        padding: '5px 10px',
        marginTop: '20px',
        cursor: 'pointer',
        width: { sm: '400px', xs: '80%' },
      }}>
      Выйти
    </Box>
  )
}

export default LogoutButton
