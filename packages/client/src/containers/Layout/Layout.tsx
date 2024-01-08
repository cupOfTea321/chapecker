import { PropsWithChildren } from 'react'
import Box from '@mui/material/Box'
import backgrouundPicture from '../../assets/chessboard-background.png'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        minWidth: '110vw',
        minHeight: '110vh',
        background: `url(${backgrouundPicture})`,
        backgroundSize: 'contain',
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
