import { MouseEventHandler, PropsWithChildren } from 'react'
import './PrimitiveButton.scss'

type TPrimitiveButton = {
  disabled?: boolean
  onClick?: MouseEventHandler
}

const PrimitiveButton = (props: PropsWithChildren<TPrimitiveButton>) => {
  return (
    <button {...props} children={props.children} className="contained-button" />
  )
}

export default PrimitiveButton
