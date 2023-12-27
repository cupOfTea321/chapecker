export const topicURL = '/topic'
export const topicsURL = '/topics'
export const commentURL = '/comment'
export const commentsURL = '/comments/:topic_id'
export const replyURL = '/reply'
export const repliesURL = '/replies/:comment_id'
export const emojiAddURL = '/emoji'
export const emojiURL = '/emoji/:topic_id'

export const countURL = '/count'
export const countEmojiURL = countURL + emojiURL
export const countTopicsURL = countURL + topicsURL
export const countCommentsURL = countURL + commentsURL
export const countRepliesURL = countURL + repliesURL
