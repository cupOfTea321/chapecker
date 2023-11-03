export interface IForumPreview {
  id: string
  theme: string
  messages: number
  lastMessage: { user: string; userId: string; avatar: null | string }
}

export type TForumPreview = IForumPreview[]
