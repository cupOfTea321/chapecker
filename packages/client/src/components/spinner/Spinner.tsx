import bem from 'bem-ts'
import './styles.scss'

const cn = bem('spinner')
const Spinner = () => (
  <div className={cn('container')}>
    <span className={cn()}></span>
  </div>
)

export default Spinner
