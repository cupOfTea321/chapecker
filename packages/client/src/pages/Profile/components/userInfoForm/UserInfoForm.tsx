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

import { REGEX, ERROR_MESSAGES } from '../../../../constants/validations'

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

  function localOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    let isValid = true
    console.log(user)

    for (const [key, value] of new FormData(
      e.target as HTMLFormElement
    ).entries()) {
      let propValid = true
      if (!['id', 'avatar'].includes(key)) {
        if (key.endsWith('name')) {
          // @ts-ignore
          if (key === 'display_name' && value.length === 0) {
            continue
          }
          // @ts-ignore
          propValid = REGEX.name.test(value)

          if (!propValid) {
            switch (key) {
              case 'first_name':
                alert(ERROR_MESSAGES.name)
                break
              case 'second_name':
                alert(ERROR_MESSAGES.surname)
                break
              case 'display_name':
                alert(ERROR_MESSAGES.displayName)
                break
            }
          }
        } else {
          // @ts-ignore
          propValid = REGEX[key].test(value)

          if (!propValid) {
            // @ts-ignore
            alert(ERROR_MESSAGES[key])
          }
        }
      }

      isValid &&= propValid
    }

    if (isValid) {
      onSubmit(e)
    }
  }

  return (
    <>
      <h2 hidden>{ProfileTabs.userData}</h2>
      <form
        onSubmit={localOnSubmit}
        className={cn()}
        encType="multipart/form-data">
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
        </div>
      </form>
    </>
  )
}

export default memo(UserInfoForm)
