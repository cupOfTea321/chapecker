export type TFieldNames =
  | 'login'
  | 'password'
  | 'password_again'
  | 'first_name'
  | 'second_name'
  | 'email'
  | 'phone'
  | 'oldPassword'
  | 'newPassword'
  | 'newPassword_again'
  | 'search'
  | 'display_name'
  | 'avatar'
  | 'editProfile'
  | 'editPassword'
  | 'logout'
  | 'submit'

export type TFieldKeys =
  | 'login'
  | 'password'
  | 'passwordAgain'
  | 'firstName'
  | 'secondName'
  | 'email'
  | 'phone'
  | 'oldPassword'
  | 'newPassword'
  | 'newPasswordAgain'
  | 'search'
  | 'displayName'
  | 'avatar'
  | 'editProfileBtn'
  | 'editPasswordBtn'
  | 'logoutBtn'
  | 'submitBtn'

export const NAMES: Record<TFieldKeys, TFieldNames> = {
  login: 'login',
  password: 'password',
  passwordAgain: 'password_again',
  firstName: 'first_name',
  secondName: 'second_name',
  email: 'email',
  phone: 'phone',
  oldPassword: 'oldPassword',
  newPassword: 'newPassword',
  newPasswordAgain: 'newPassword_again',
  search: 'search',
  displayName: 'display_name',
  avatar: 'avatar',
  editProfileBtn: 'editProfile',
  editPasswordBtn: 'editPassword',
  logoutBtn: 'logout',
  submitBtn: 'submit',
}

export const LABELS = {
  [NAMES.login]: 'Login',
  [NAMES.password]: 'Password',
  [NAMES.passwordAgain]: 'Password again',
  [NAMES.firstName]: 'Name',
  [NAMES.secondName]: 'Surname',
  [NAMES.email]: 'Email',
  [NAMES.phone]: 'Phone number',
  [NAMES.displayName]: 'Имя в чате',
  [NAMES.avatar]: 'Аватар',
  [NAMES.oldPassword]: 'Old password',
  [NAMES.newPassword]: 'New password',
  [NAMES.newPasswordAgain]: 'New password again',
  [NAMES.editProfileBtn]: 'Edit profile',
  [NAMES.editPasswordBtn]: 'Edit passord',
  [NAMES.logoutBtn]: 'Log out',
}

export const IDS = {
  [NAMES.login]: 'fld-login',
  [NAMES.password]: 'fld-password',
  [NAMES.passwordAgain]: 'fld-password_again',
  [NAMES.firstName]: 'fld-first-name',
  [NAMES.secondName]: 'fld-second-name',
  [NAMES.phone]: 'fld-phone',
  [NAMES.email]: 'fld-email',
  [NAMES.oldPassword]: 'fld-old-password',
  [NAMES.newPassword]: 'fld-new-password',
  [NAMES.newPasswordAgain]: 'fld-new-password_again',
  [NAMES.search]: 'fld-search',
  [NAMES.displayName]: 'fld-display-name',
  [NAMES.avatar]: 'fld-avatar',
  [NAMES.editProfileBtn]: 'fld-edit-profile-btn',
  [NAMES.editPasswordBtn]: 'fld-edit-password-btn',
  [NAMES.logoutBtn]: 'fld-logut-btn',
  [NAMES.submitBtn]: 'fld-submit-btn',
}

export const PLACEHOLDERS = {
  [NAMES.login]: 'Введите логин',
  [NAMES.password]: 'Введите пароль',
  [NAMES.email]: 'Введите почту',
  [NAMES.firstName]: 'Введите имя',
  [NAMES.secondName]: 'Введите фамилию',
  [NAMES.phone]: 'Введите телефон',
  [NAMES.passwordAgain]: 'Повторно введите пароль',
  [NAMES.displayName]: 'Введите имя в чате',
  [NAMES.oldPassword]: '**********',
  [NAMES.newPassword]: '**********',
  [NAMES.newPasswordAgain]: '************',
}

export const INPUT_TYPES = {
  [NAMES.login]: 'text',
  [NAMES.password]: 'password',
  [NAMES.passwordAgain]: 'password',
  [NAMES.oldPassword]: 'password',
  [NAMES.newPassword]: 'password',
  [NAMES.newPasswordAgain]: 'password',
  [NAMES.search]: 'search',
  [NAMES.phone]: 'tel',
  [NAMES.email]: 'email',
  [NAMES.firstName]: 'text',
  [NAMES.secondName]: 'text',
  [NAMES.displayName]: 'text',
  [NAMES.avatar]: 'file',
}
