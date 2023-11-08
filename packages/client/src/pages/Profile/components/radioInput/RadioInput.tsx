const RadioInput = ({
  keyValue,
  index,
}: {
  keyValue: string
  index: number
}) => (
  <input
    hidden
    type="radio"
    id={keyValue}
    name="tab-control"
    defaultChecked={index === 0}
  />
)

export default RadioInput
