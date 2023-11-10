import { FormEvent, forwardRef, memo, useCallback, useState } from 'react'
import { IProfileFormInputProps, IUser, getFieldType } from '../../model'

const LabeledInput = forwardRef(function (
  { filedKey, fieldText, user, cn, isActive }: IProfileFormInputProps,
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

  return (
    <fieldset className={cn('fieldset')} title={fieldText}>
      <legend className={cn('legend')}>{fieldText}</legend>
      <label htmlFor={filedKey}>
        <input
          ref={ref}
          className={cn('input', { active: isActive })}
          onInput={handleInput}
          value={value || ''}
          type={getFieldType(filedKey)}
          id={filedKey}
          name={filedKey}
          placeholder={fieldText}
        />
      </label>
    </fieldset>
  )
})

export default memo(LabeledInput)
