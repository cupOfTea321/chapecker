import React, { FormHTMLAttributes, PropsWithChildren } from 'react'
import styles from './Form.module.scss'

type OwnProps = {
  myCustomProp?: 'some' | 'other'
} & FormHTMLAttributes<HTMLFormElement>

type Props = PropsWithChildren<OwnProps>

const Form = ({ children, ...props }: Props) => {
  return (
    <form className={styles.form} {...props}>
      {children}
    </form>
  )
}

export default Form
