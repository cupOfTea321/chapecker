import { useState, useMemo, memo, useCallback, useRef } from 'react'
import UserAvatar from './components/userAvatar/UserAvatar'
import RadioInput from './components/radioInput/RadioInput'
import TabItem from './components/tabItem/TabItem'
import ChangePasswordForm from './components/changePasswordForm/ChangePasswordForm'
import UserInfoForm from './components/userInfoForm/UserInfoForm'

import { ChangePasswordFormFields, IUser, ProfileTabs } from './model'
import { userInfo } from './mock'
import { changePassword, changeUserInfo } from './actions'

import bem from 'bem-ts'
import './styles.scss'

const ProfilePage = () => {
  const cn = bem('profile')

  const user: IUser = useMemo(() => userInfo, [userInfo])

  const firstNameRef = useRef<HTMLInputElement>(null)

  const [isFormActive, setFormStatus] = useState(false)
  const onEdit = useCallback(() => {
    setFormStatus(true)
    firstNameRef.current?.focus()
  }, [firstNameRef])
  const onAbolution = useCallback(() => setFormStatus(false), [])

  const onUserDataChange = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)
      try {
        await changeUserInfo(formData as unknown as IUser)
      } catch (err) {
        throw Error((err as Error).message as string)
      }
    },
    []
  )

  const onPasswordChange = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)
      const [__, newPassword, confirm] = Object.keys(ChangePasswordFormFields)
      if (formData.get(confirm) !== formData.get(newPassword)) {
        alert('Новый пароль не совпадает с подтвреждением')
      }
      try {
        await changePassword(formData as unknown as IUser)
      } catch (err) {
        throw Error((err as Error).message as string)
      }
    },
    []
  )

  return (
    <div className={cn({ chesBackgrounded: true })}>
      <div className={cn('container')}>
        <h1 className={cn('header')}>Страница пользователя</h1>
        <div className={cn('avatarContainer')}>
          <UserAvatar avatarSrc={user.avatar} />
        </div>
        {Object.keys(ProfileTabs).map((key, index) => (
          <RadioInput key={key} keyValue={key} index={index} />
        ))}
        <ul className={cn('navigationList')}>
          {Object.entries(ProfileTabs).map(([tabKey, tabValue]) => (
            <TabItem key={tabKey} tabKey={tabKey} tabValue={tabValue} />
          ))}
        </ul>
        <div className="slider">
          <div className="indicator"></div>
        </div>
        <div className="content">
          <section>
            <UserInfoForm
              isFormActive={isFormActive}
              user={user}
              firstNameRef={firstNameRef}
              onEdit={onEdit}
              onAbolution={onAbolution}
              onSubmit={onUserDataChange}
            />
          </section>
          <section>
            <ChangePasswordForm onSubmit={onPasswordChange} user={user} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default memo(ProfilePage)
