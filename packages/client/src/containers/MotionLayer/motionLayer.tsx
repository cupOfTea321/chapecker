import React from 'react'
import { Box } from '@mui/material'

const MotionLayer = ({
  layerURL,
  className,
  children,
}: {
  layerURL: string
  className?: string
  children?: React.ReactNode
}) => (
  <Box
    sx={{
      background: 'url(' + layerURL + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
    className={className}>
    {children}
  </Box>
)

export default MotionLayer
