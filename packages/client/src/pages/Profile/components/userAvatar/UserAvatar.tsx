import { ChangeEvent, memo, useCallback, useState } from 'react'
import Mustache from '../mustache/Mustache'
import { IUser } from '../../model'
import { AvatarFormFileds } from './model'
import { baseURL, sourceURL } from '../../../../API/endpoints'
import { changeUserAvatar } from './actions'

import bem from 'bem-ts'
import './styles.scss'

const UserAvatar = ({ avatarSrc }: { avatarSrc: IUser['avatar'] }) => {
  const [avatrSource, setAvatarSource] = useState(avatarSrc)
  const deafultAvatar = !avatrSource && <Mustache />
  const cn = bem('userAvatar')

  const userAvatr = avatrSource && (
    <>
      <img
        className={cn('picture')}
        alt="User avatar"
        src={baseURL.concat('/', sourceURL, '/', avatrSource)}
      />
      <span className={cn('left')}></span>
      <span className={cn('right')}></span>
    </>
  )

  const handleFileInput = useCallback(async (e: ChangeEvent) => {
    const [file] = (e.target as HTMLInputElement).files as FileList
    try {
      const { avatar } = await changeUserAvatar(file)
      setAvatarSource(avatar)
    } catch (err) {
      throw Error((err as Error).message as string)
    }
  }, [])

  return (
    <div className={cn()}>
      {deafultAvatar}
      {userAvatr}
      <label htmlFor={AvatarFormFileds.name} title="Установить аватар">
        <input
          onChange={handleFileInput}
          id={AvatarFormFileds.name}
          className={cn('input')}
          type="file"
        />
        <span className={cn('inputButton')}>
          {userAvatr && 'Сменить аватар'}
          {deafultAvatar && 'Установить аватар'}
        </span>
      </label>
    </div>
  )
}

export default memo(UserAvatar)
