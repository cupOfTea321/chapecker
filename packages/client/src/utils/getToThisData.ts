const getToThisday = (createdAt: string) => {
  const now = new Date()
  const created = new Date(createdAt)
  switch (now.getDay() - created.getDay()) {
    case 0:
      return (
        created.getHours() +
        ':' +
        (created.getMinutes() < 10
          ? '0' + created.getMinutes()
          : created.getMinutes())
      )
    case -1:
      return created.getDay()
    default:
      return (
        created.getDate() +
        '.' +
        (Number(created.getMonth()) + 1) +
        '.' +
        created.getFullYear()
      )
  }
}

export default getToThisday
