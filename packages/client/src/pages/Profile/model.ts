export enum ProfileFormFileds {
  first_name = 'First name',
  second_name = 'Second name',
  display_name = 'Display name',
  login = 'login',
  email = 'email',
  phone = 'phone',
}
export interface IUser {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatarSrc: string
}

export interface IProfileFormInputProps {
  key: string
  filedKey: string
  fieldText: string
  user: IUser
}

export const getFieldType = (key: string) => {
  switch (key) {
    case 'email':
      return 'email'
    case 'phone':
      return 'tel'
    default:
      return 'text'
  }
}
