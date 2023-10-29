import TextField, { BaseTextFieldProps } from '@mui/material/TextField'

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

  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: borderFocus,
    },

  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused}.${inputLabelClasses.error} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: 'red',
    },

  [`& .${outlinedInputClasses.input}`]: {
    color: textColor,
  },

  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      color: textColor,
    },

  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: colorGreen300,
  },

  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}.${inputLabelClasses.error}`]:
    {
      color: 'red',
    },

  [`& .${inputLabelClasses.outlined}`]: {
    color: secondaryTextColor,
  },

  [`&:hover .${outlinedInputClasses.input}`]: {
    borderColor: borderFocus,
  },

  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: borderFocus,
    },

  [`&:hover .${outlinedInputClasses.input}`]: {
    borderColor: borderFocus,
  },

  [`& :hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: borderFocus,
    },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: colorGreen300,
  },
  [`&:hover .${inputLabelClasses.error}`]: {
    color: 'red',
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
