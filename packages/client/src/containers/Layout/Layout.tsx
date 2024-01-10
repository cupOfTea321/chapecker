import { PropsWithChildren } from 'react'
import Box from '@mui/material/Box'
import backgrouundPicture from '../../assets/chessboard-background.png'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `url(${backgrouundPicture})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      {children}
    </Box>
  )
}

export default Layout
