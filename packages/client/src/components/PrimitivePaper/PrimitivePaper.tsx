import './PrimitivePaper.scss'
import { PropsWithChildren } from 'react'

const PrimitivePaper = (props: PropsWithChildren & { class?: string }) => {
  return (
    <div className="primitive-paper">
      <div className={'primitive-paper__content ' + props.class}>
        {props.children}
      </div>
    </div>
  )
}

export default PrimitivePaper
