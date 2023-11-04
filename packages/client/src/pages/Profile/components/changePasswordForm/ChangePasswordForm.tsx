import { memo } from 'react'
import LabeledInput from '../input/LabeledInput'
import { ChangePasswordFormFields, IUser, ProfileTabs } from '../../model'

import bem from 'bem-ts'
import './styles.scss'

const ChangePasswordForm = ({
  onSubmit,
  user,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void | Error>
  user: IUser
}) => {
  const cn = bem('changePasswordForm')

  return (
    <>
      <h2 hidden>{ProfileTabs.changePassword}</h2>
      <form onSubmit={onSubmit} className={cn()} encType="multipart/form-data">
        {Object.entries(ChangePasswordFormFields).map(([key, text]) => (
          <LabeledInput
            cn={cn}
            key={key}
            filedKey={key}
            fieldText={text}
            user={user}
            isActive={true}
          />
        ))}
        <div className={cn('control')}>
          <input
            className={cn('controlCofirm')}
            type="submit"
            title="Submit change"
            value="Отправить изменения"
          />
        </div>
      </form>
    </>
  )
}

export default memo(ChangePasswordForm)
