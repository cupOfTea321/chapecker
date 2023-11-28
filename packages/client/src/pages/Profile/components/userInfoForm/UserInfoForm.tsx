import { memo, useState } from 'react'

import bem from 'bem-ts'
import './styles.scss'
import {
  IProfileFormInputProps,
  IUser,
  ProfileFormFileds,
  ProfileTabs,
} from '../../model'
import LabeledInput from '../input/LabeledInput'

import {
  FIELD_REGEX,
  FIELD_ERROR_MESSAGES,
} from '../../../../constants/validations'

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

  const [errors, setErrors] = useState<Record<string, string>>({})

  function localOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    let isValid = true
    const localErrors: Record<string, string> = {}

    for (const [key, value] of new FormData(
      e.target as HTMLFormElement
    ).entries()) {
      let propValid = true
      if (!['id', 'avatar'].includes(key)) {
        if (key.endsWith('name')) {
          if (key === 'display_name' && (value as string).length === 0) {
            continue
          }

          propValid = FIELD_REGEX.first_name.test(value as string)
        } else {
          propValid = FIELD_REGEX[key].test(value as string)
        }

        if (!propValid) {
          localErrors[key] = FIELD_ERROR_MESSAGES[key]
        }
      }

      isValid &&= propValid
    }

    if (isValid) {
      onSubmit(e)
    } else {
      setErrors(localErrors)
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
            errorMsg={!!errors[key]}
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
