import './PrimitivePaper.scss'
import { PropsWithChildren } from 'react'

const PrimitivePaper = (
  props: PropsWithChildren & { class?: string; outerClass?: string }
) => {
  return (
    <div
      className={
        'primitive-paper ' + (props.outerClass ? props.outerClass : '')
      }>
      <div
        className={
          'primitive-paper__content ' + (props.class ? props.class : '')
        }>
        {props.children}
      </div>
    </div>
  )
}

export default PrimitivePaper
