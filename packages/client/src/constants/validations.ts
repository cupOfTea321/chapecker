import { NAMES } from './fields'

export const ERROR_MESSAGES = {
  password: 'Неверный пароль',
  email: 'Неверный email',
  login: 'Неверный логин',
  phone: 'Неверный номер телефона',
  name: 'Неверное имя',
  surname: 'Неверная фамилия',
  displayName: 'Неверное имя для отображения',
  empty: 'Поле не может быть пустым',
  required: 'Поле обязательно для заполнения',
  invalidPasswordOrLogin: 'Неверный логин или пароль',
  userAlreadyExist: 'Пользователь с таким email или логином уже существует',
  userAlreadyInSystem: 'Пользователь уже в системе',
  loginError: 'Ошибка при входе, попробуйте позже',
  signUpError: 'Ошибка при регистрации, попробуйте позже',
}

export const REGEX = {
  password: /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,40}$/,
  notEmpty: /.+/,
  name: /^[A-ZА-Я]+[a-zA-Zа-яА-Я-]*$/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  login: /(?!^\d+$)^[a-zA-Z0-9_-]{3,20}$/,
  phone: /^\+?\d{1,3}[- ]?\d{2,3}[- ]?\d{2,3}[- ]?\d{2,3}$/,
  displayName: /^(?:|[A-Za-z][0-9]{0,14}[A-Za-z0-9]*)$/,
}

export const FIELD_REGEX = {
  [NAMES.login]: REGEX.login,
  [NAMES.password]: REGEX.password,
  [NAMES.passwordAgain]: REGEX.password,
  [NAMES.oldPassword]: REGEX.password,
  [NAMES.newPassword]: REGEX.password,
  [NAMES.newPasswordAgain]: REGEX.password,
  [NAMES.search]: REGEX.notEmpty,
  [NAMES.phone]: REGEX.phone,
  [NAMES.email]: REGEX.email,
  [NAMES.firstName]: REGEX.name,
  [NAMES.secondName]: REGEX.name,
  [NAMES.displayName]: REGEX.displayName,
}

export const FIELD_ERROR_MESSAGES = {
  [NAMES.login]: ERROR_MESSAGES.login,
  [NAMES.password]: ERROR_MESSAGES.password,
  [NAMES.passwordAgain]: ERROR_MESSAGES.password,
  [NAMES.oldPassword]: ERROR_MESSAGES.password,
  [NAMES.newPassword]: ERROR_MESSAGES.password,
  [NAMES.newPasswordAgain]: ERROR_MESSAGES.password,
  [NAMES.search]: ERROR_MESSAGES.empty,
  [NAMES.phone]: ERROR_MESSAGES.phone,
  [NAMES.email]: ERROR_MESSAGES.email,
  [NAMES.firstName]: ERROR_MESSAGES.name,
  [NAMES.secondName]: ERROR_MESSAGES.surname,
  [NAMES.displayName]: ERROR_MESSAGES.displayName,
}
