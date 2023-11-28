export enum ProfileTabs {
  userData = 'Данные пользователя',
  changePassword = 'Смена пароля',
}
export enum ProfileFormFileds {
  first_name = 'Имя',
  second_name = 'Фамилия',
  display_name = 'Никнейм',
  login = 'логин',
  email = 'e-mail',
  phone = 'телефон',
}

export enum ChangePasswordFormFields {
  oldPassword = 'Пароль',
  newPassword = 'Новый пароль',
  confirm = 'Подтвреждение',
}
export interface IUser {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export interface IProfileFormInputProps {
  key: string
  filedKey: string
  fieldText: string
  errorMsg: boolean
  user: IUser
  cn: (arg1: string, arg2?: { [x: string]: boolean }) => string
  isActive: boolean
  ref: React.Ref<HTMLInputElement> | undefined
}

export interface IChangePasswordFormProps {
  key: string
  filedKey: string
  fieldText: string
  user: IUser
  cn: (arg1: string, arg2?: { [x: string]: boolean }) => string
  ref: React.Ref<HTMLInputElement> | undefined
}

export const getFieldType = (key: string) => {
  switch (key) {
    case 'email':
      return 'email'
    case 'phone':
      return 'tel'
    case 'oldPassword':
    case 'newPassword':
    case 'confirm':
      return 'password'
    default:
      return 'text'
  }
}
