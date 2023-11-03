import React, { PropsWithChildren } from 'react'
import styles from './Layout.module.scss'
import Box from '@mui/material/Box'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
      <section className={styles.layout}>{children}</section>
    </Box>
  )
}

export default Layout
