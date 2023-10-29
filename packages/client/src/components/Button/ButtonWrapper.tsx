import React, { PropsWithChildren } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

type OwnProps = ButtonProps

type Props = OwnProps

const ButtonWrapper = ({ children, ...props }: PropsWithChildren<Props>) => {
  return <Button {...props}>{children}</Button>
}

export default ButtonWrapper
