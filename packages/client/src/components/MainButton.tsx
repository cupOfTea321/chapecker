import React from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
type mainBtn = {
  to: string
  text: string
}
const MainButton = ({ to, text }: mainBtn) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(to)
  }
  return (
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
        width: '400px',
      }}
      onClick={handleClick}>
      {text}
    </Box>
  )
}

export default MainButton
