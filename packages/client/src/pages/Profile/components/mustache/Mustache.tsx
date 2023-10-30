import bem from 'bem-ts'
import './styles.scss'

const DefaultAvatr = () => {
  const cn = bem('moustache')

  return (
    <div className={cn('container')}>
      <div className={cn()}>
        <div className={cn('left')}></div>
        <div className={cn('right')}></div>
      </div>
    </div>
  )
}

export default DefaultAvatr
