import TextField, { BaseTextFieldProps } from '@mui/material/TextField'
import React from 'react'

import styles from './TextFieldWrapper.module.scss'
import { styled } from '@mui/material/styles'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'
import { inputLabelClasses } from '@mui/material/InputLabel'

type OwnProps = BaseTextFieldProps

type Props = OwnProps

const borderColor = 'hsla(0,0%,100%,.1)'
const borderFocus = '#81b64c'
const textColor = 'hsla(0,0%,100%,.72)'
const secondaryTextColor = 'hsla(0,0%,100%,.5)'
const colorGreen300 = '#81b64c'

const StyledTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: borderColor,
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: borderFocus,
    },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: borderFocus,
    },
  [`& .${outlinedInputClasses.input}`]: {
    color: textColor,
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    borderColor: borderFocus,
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      color: textColor,
    },
  [`& .${inputLabelClasses.outlined}`]: {
    color: secondaryTextColor,
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: colorGreen300,
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: colorGreen300,
  },
})

const TextFieldWrapper = (props: Props) => {
  return (
    <StyledTextField
      className={styles.textField}
      variant="outlined"
      size="medium"
      {...props}
    />
  )
}

export default TextFieldWrapper
