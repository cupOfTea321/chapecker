import React, { useMemo } from 'react'

import bem from 'bem-ts'
import './styles.scss'
import {
  IProfileFormInputProps,
  IUser,
  ProfileFormFileds,
  getFieldType,
} from './model'
import { userInfo } from './stubs'
import { sourceEndpoint } from '../../API/endpoints'

const ProfilePage = () => {
  const cn = bem('profile')

  const user: IUser = useMemo(() => userInfo, [userInfo])

  return (
    <div className={cn({})}>
      <h1>Страница пользователя</h1>
      <form>
        {Object.entries(ProfileFormFileds).map(([key, text]) => (
          <LabeledInput key={key} filedKey={key} fieldText={text} user={user} />
        ))}
      </form>
    </div>
  )
}

const AvatarLabeledInput = ({
  avatarSrc,
}: {
  avatarSrc: IUser['avatarSrc']
}) => {
  return (
    <label title="User avatar">
      <img
        alt="avatar"
        src={
          avatarSrc
            ? sourceEndpoint.concat(avatarSrc)
            : './assets/defaultavatar.svg'
        }
      />
      <input type="type" />
      <span>Сменить аватар</span>
    </label>
  )
}

const LabeledInput = ({
  filedKey,
  fieldText,
  user,
}: IProfileFormInputProps) => {
  return (
    <label htmlFor={filedKey} title={fieldText}>
      {fieldText}
      <input
        value={user[filedKey as keyof IUser]}
        type={getFieldType(filedKey)}
        id={filedKey}
        name={filedKey}
        placeholder={fieldText}
        disabled
      />
    </label>
  )
}

export default ProfilePage
