import { memo } from 'react'

import bem from 'bem-ts'
import './styles.scss'
import {
  IProfileFormInputProps,
  IUser,
  ProfileFormFileds,
  ProfileTabs,
} from '../../model'
import LabeledInput from '../input/LabeledInput'
import PrimitiveButton from '../../../../components/PrimitiveButton/PrimitiveButton'
import { logOut } from '../../actions'
import { Link } from 'react-router-dom'

const UserInfoForm = ({
  user,
  firstNameRef,
  isFormActive,
  onEdit,
  onAbolution,
  onSubmit,
}: {
  isFormActive: boolean
  user: IUser
  firstNameRef: IProfileFormInputProps['ref']
  onEdit: () => void
  onAbolution: () => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void | Error>
}) => {
  const cn = bem('userInfoForm')
  return (
    <>
      <h2 hidden>{ProfileTabs.userData}</h2>
      <form onSubmit={onSubmit} className={cn()} encType="multipart/form-data">
        {Object.entries(ProfileFormFileds).map(([key, text]) => (
          <LabeledInput
            ref={text === ProfileFormFileds.first_name ? firstNameRef : null}
            cn={cn}
            key={key}
            filedKey={key}
            fieldText={text}
            user={user}
            isActive={isFormActive}
          />
        ))}
        <div className={cn('control')}>
          <input
            onClick={onEdit}
            hidden={isFormActive}
            className={cn('controlAbolution')}
            type="button"
            title="Нажми, чтобы измененить данные"
            value="Нажми, чтобы внести изменения"
          />
          <input
            onClick={onAbolution}
            hidden={!isFormActive}
            className={cn('controlAbolution')}
            type="button"
            title="Cancel change"
            value="Сброс"
          />
          <input
            hidden={!isFormActive}
            className={cn('controlCofirm')}
            type="submit"
            title="Submit change"
            value="Отправить изменения"
          />
          <Link to="/login">
            <PrimitiveButton onClick={logOut} id="logout-button">
              Выйти
            </PrimitiveButton>
          </Link>
        </div>
      </form>
    </>
  )
}

export default memo(UserInfoForm)
