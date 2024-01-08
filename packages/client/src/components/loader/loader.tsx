import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Loader = () => (
  <Box sx={{ display: 'flex', margin: 'auto' }}>
    <CircularProgress color="success" />
  </Box>
)

export default Loader
