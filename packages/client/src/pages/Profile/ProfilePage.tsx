import React from 'react'

import bem from 'bem-ts'
import './styles.scss'
import { IProfileFormInputProps } from './model'

const ProfilePage = () => {
  const cn = bem('profile')

  return (
    <div className={cn()}>
      <h1>User profile page</h1>
      <label></label>
    </div>
  )
}

const LabeledInput = ({ name }: IProfileFormInputProps) => {
  return (
    <label htmlFor={name}>
      <input id={name} name={name} title={name} />
    </label>
  )
}

export default ProfilePage
