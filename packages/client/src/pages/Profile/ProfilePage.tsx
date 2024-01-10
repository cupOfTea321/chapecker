import { useState, useMemo, useCallback, useRef } from 'react'
import UserAvatar from './components/userAvatar/UserAvatar'
import RadioInput from './components/radioInput/RadioInput'
import TabItem from './components/tabItem/TabItem'
import ChangePasswordForm from './components/changePasswordForm/ChangePasswordForm'
import UserInfoForm from './components/userInfoForm/UserInfoForm'
import { ChangePasswordFormFields, IUser, ProfileTabs } from './model'
import { changePassword, changeUserInfo } from './actions'
import { useTypedSelector } from '../../redux/store'
import { getUserData } from '../../redux/selectors'
import { publilRoutes } from '../../router/router'
import { Navigate } from 'react-router-dom'
import { useTheme } from '../../utils/useTheme'
import bem from 'bem-ts'
import './styles.scss'

const ProfilePage = () => {
  const cn = bem('profile')
  const userinfoFromStore = useTypedSelector(getUserData)
  const user: IUser | null = useMemo(
    () => userinfoFromStore,
    [userinfoFromStore]
  )
  if (!user) return <Navigate to={publilRoutes.login.path} />
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
      const data: { [x: string]: unknown } = {}
      for (const [key, value] of new FormData(
        e.target as HTMLFormElement
      ).entries()) {
        data[key] = value
      }
      try {
        await changeUserInfo(data as unknown as IUser)
      } catch (err) {
        throw Error((err as Error).message as string)
      }
    },
    []
  )

  const onPasswordChange = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data: { [x: string]: unknown } = {}
      for (const [key, value] of new FormData(
        e.target as HTMLFormElement
      ).entries()) {
        data[key] = value
      }
      if (
        data[ChangePasswordFormFields.confirm] !==
        data[ChangePasswordFormFields.newPassword]
      ) {
        alert('Новый пароль не совпадает с подтвреждением')
      }
      try {
        await changePassword(data as unknown as IUser)
      } catch (err) {
        throw Error((err as Error).message as string)
      }
    },
    []
  )

  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`${cn({ chesBackgrounded: true })} ${theme}`}>
      <div className={`${cn('container')} ${theme}`}>
        <div className="themeContainer">
          <span>Текущая тема:</span>

          <div onClick={toggleTheme} className={`themeBtn ${theme}`}>
            {theme !== 'dark' ? 'Светлая' : 'Тёмная'}
          </div>
        </div>

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
              key={`${isFormActive}`}
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

export default ProfilePage
