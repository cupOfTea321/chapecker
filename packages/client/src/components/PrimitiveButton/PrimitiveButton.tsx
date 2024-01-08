import { MouseEventHandler, PropsWithChildren } from 'react'
import './PrimitiveButton.scss'

type TPrimitiveButton = {
  disabled?: boolean
  onClick?: MouseEventHandler
  className?: string
  id?: string
}

const PrimitiveButton = (props: PropsWithChildren<TPrimitiveButton>) => {
  return (
    <button
      {...props}
      children={props.children}
      className={'contained-button'}
      type="button"
    />
  )
}

export default PrimitiveButton
