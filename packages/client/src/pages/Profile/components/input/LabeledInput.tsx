import { FormEvent, forwardRef, memo, useCallback, useState } from 'react'
import { IProfileFormInputProps, IUser, getFieldType } from '../../model'
import { FIELD_ERROR_MESSAGES } from '../../../../constants/validations'
import { useTheme } from '../../../../utils/useTheme'

const LabeledInput = forwardRef(function (
  { filedKey, fieldText, user, cn, isActive, errorMsg }: IProfileFormInputProps,
  ref: React.LegacyRef<HTMLInputElement>
) {
  const [value, setValue] = useState(user[filedKey as keyof IUser])
  const handleInput = useCallback(
    (e: FormEvent) => {
      if (isActive) {
        setValue((e.target as HTMLInputElement).value)
      }
    },
    [isActive]
  )

  const { theme } = useTheme()

  return (
    <fieldset className={cn('fieldset')} title={fieldText}>
      <legend className={cn('legend')}>{fieldText}</legend>
      <label htmlFor={filedKey}>
        <input
          ref={ref}
          className={`${cn('input', { active: isActive })} ${theme}`}
          onInput={handleInput}
          value={value || ''}
          type={getFieldType(filedKey)}
          id={filedKey}
          name={filedKey}
          placeholder={fieldText}
        />
      </label>

      {errorMsg && (
        <div className={cn('errorMessage')}>
          {FIELD_ERROR_MESSAGES[filedKey]}
        </div>
      )}
    </fieldset>
  )
})

export default memo(LabeledInput)
