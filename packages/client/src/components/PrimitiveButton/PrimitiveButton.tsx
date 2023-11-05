import { PropsWithChildren } from 'react'
import './PrimitiveButton.scss'

type TPrimitiveButton = {
  disabled?: boolean
}

const PrimitiveButton = (props: PropsWithChildren<TPrimitiveButton>) => {
  return (
    <button {...props} children={props.children} className="contained-button" />
  )
}

export default PrimitiveButton
