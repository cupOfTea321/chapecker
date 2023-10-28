import { PropsWithChildren } from 'react'
import './PrimitiveButton.scss'

const PrimitiveButton = (props: PropsWithChildren) => {
  return (
    <button {...props} children={props.children} className="contained-button" />
  )
}

export default PrimitiveButton
