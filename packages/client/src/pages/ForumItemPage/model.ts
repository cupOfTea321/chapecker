export type TForum = {
  id: string
  theme: string
  messages: TMessage[]
}

export type TMessage = {
  messageId: string
  time: Date
  author: string
  message: string
}

export enum messageFormFileds {
  message = 'message',
}
