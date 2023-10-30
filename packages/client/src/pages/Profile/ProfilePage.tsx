import { useState, useMemo, memo, useCallback, useRef } from 'react'
import UserAvatar from './components/userAvatar/UserAvatar'

import bem from 'bem-ts'
import './styles.scss'
import {
  ChangePasswordFormFields,
  IUser,
  ProfileFormFileds,
  ProfileTabs,
} from './model'
import { userInfo } from './mock'
import { changePassword, changeUserInfo } from './actions'
import LabeledInput from './components/input/LabeledInput'
import getImageUrl from '../../utils/getImageUrl'

const ProfilePage = () => {
  const cn = bem('profile')

  const user: IUser = useMemo(() => userInfo, [userInfo])

  const firstNameRef = useRef<HTMLInputElement>(null)
  const oldPasswordRef = useRef<HTMLInputElement>(null)

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

  const onChangePasswordClick = useCallback(
    () => oldPasswordRef.current?.focus(),
    [oldPasswordRef]
  )

  const onPasswordChange = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)
      const [__, newPassword, confirm] = Object.keys(ChangePasswordFormFields)
      if (formData.get(confirm) !== formData.get(newPassword)) {
        throw Error('Новый пароль не совпадает с подтвреждением')
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
        <UserAvatar avatarSrc={user.avatar} />

        {Object.keys(ProfileTabs).map((key, index) => (
          <input
            key={key}
            hidden
            type="radio"
            id={key}
            name="tab-control"
            defaultChecked={index === 0}
          />
        ))}
        <ul className={cn('navigationList')}>
          {Object.entries(ProfileTabs).map(([tabKey, tabValue]) => (
            <li
              onClick={
                tabValue === ProfileTabs.changePassword
                  ? onChangePasswordClick
                  : undefined
              }
              key={tabKey}
              className={cn('navigationItem')}
              title={tabValue}>
              <label
                className={cn('navigationItemLabel')}
                htmlFor={tabKey}
                role="button">
                <img
                  className={cn('tabPicture')}
                  alt={tabValue}
                  src={getImageUrl('../assets/' + tabKey + '.svg')}
                />
                <span className={cn('navigationItemLabelName')}>
                  {tabValue}
                </span>
              </label>
            </li>
          ))}
        </ul>
        <div className="slider">
          <div className="indicator"></div>
        </div>

        <div className="content">
          <section>
            <h2 hidden>{ProfileTabs.userData}</h2>
            <form
              onSubmit={onUserDataChange}
              className={cn('dataForm')}
              encType="multipart/form-data">
              {Object.entries(ProfileFormFileds).map(([key, text]) => (
                <LabeledInput
                  ref={
                    text === ProfileFormFileds.first_name ? firstNameRef : null
                  }
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
                  title="Cancel change"
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
          </section>
          <section>
            <h2 hidden>{ProfileTabs.changePassword}</h2>
            <form
              onSubmit={onPasswordChange}
              className={cn('dataForm')}
              encType="multipart/form-data">
              {Object.entries(ChangePasswordFormFields).map(([key, text]) => (
                <LabeledInput
                  ref={
                    text === ChangePasswordFormFields.oldPassword
                      ? oldPasswordRef
                      : null
                  }
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
          </section>
        </div>
      </div>
    </div>
  )
}

export default memo(ProfilePage)
