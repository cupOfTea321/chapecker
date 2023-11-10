import getImageUrl from '../../../../utils/getImageUrl'

import bem from 'bem-ts'
import './styles.scss'

const TabItem = ({
  tabKey,
  tabValue,
  onClick,
}: {
  tabKey: string
  tabValue: string
  onClick?: () => void | null
}) => {
  const cn = bem('tabItem')

  return (
    <li className={cn()} title={tabValue} onClick={onClick}>
      <label className={cn('label')} htmlFor={tabKey} role="button">
        <img
          className={cn('tabPicture')}
          alt={tabValue}
          src={getImageUrl('../assets/' + tabKey + '.svg')}
        />
        <span className={cn('text')}>{tabValue}</span>
      </label>
    </li>
  )
}

export default TabItem
