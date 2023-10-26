export default new Proxy(
  {
    404: {
      errorCode: '404',
      comment: 'Попробуйте снова',
    },
    500: {
      errorCode: '500',
      comment: 'Похоже, сервер упал',
    },
    403: {
      errorCode: '403',
      comment: 'Нет доступа',
    },
    400: {
      errorCode: '400',
      comment: 'Попробуйте снова',
    },
  },
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(target: Record<string, any>, prop: string) {
      if (prop in target) {
        return target[prop]
      }
      return {
        errorCode: prop,
        comment: 'Неизвестная ошибка',
      }
    },
  }
)
