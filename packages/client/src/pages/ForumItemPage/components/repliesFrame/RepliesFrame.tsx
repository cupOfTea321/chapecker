import { useCallback, useEffect, useState } from 'react'
import { TReply, getReplies } from '../forumMessagesList/actions'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material'
import Loader from '../../../../components/loader/loader'
import getToThisday from '../../../../utils/getToThisData'
import { useTypedSelector } from '../../../../redux/store'
import { getUserData } from '../../../../redux/selectors'
import { IUser } from '../../../Profile/model'
import { loadRepliesCount } from './actions'
import {
  IDLE,
  INIT_OFFSET,
  itemsLimits,
} from '../../../../constants/forumConstants'
import PrimitiveButton from '../../../../components/PrimitiveButton/PrimitiveButton'

const RepliesFrame = ({ comment_id }: { comment_id: number }) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
      setOffset(INIT_OFFSET)
    }

  const [offset, setOffset] = useState(INIT_OFFSET)
  const [{ replies, repliesCount }, setReplies] = useState<{
    replies: TReply[]
    repliesCount: number | typeof IDLE
  }>({
    replies: [],
    repliesCount: IDLE,
  })
  const repliesLimit = itemsLimits[0]
  const { first_name, second_name } = useTypedSelector(getUserData) as IUser

  const loadReplies = useCallback(async () => {
    try {
      const { data } = await getReplies({
        id: comment_id,
        limit: repliesLimit,
        offset: INIT_OFFSET,
      })
      const {
        data: { count },
      } = await loadRepliesCount(comment_id)
      setReplies({ replies: data, repliesCount: count })
    } catch (err) {
      console.log(err)
    }
  }, [comment_id, offset])

  useEffect(() => {
    if (repliesCount === IDLE) {
      loadReplies()
    }
  }, [comment_id])

  const onLoadMore = useCallback(async () => {
    const quatifier = offset < 10 ? repliesLimit : offset + repliesLimit

    const { data } = await getReplies({
      id: comment_id,
      limit: repliesLimit,
      offset: quatifier,
    })
    const {
      data: { count },
    } = await loadRepliesCount(comment_id)
    const newReplies = [...replies, ...data]
    setReplies({ replies: newReplies, repliesCount: count })
    setOffset(quatifier)
  }, [replies, offset])

  const nextLoad = repliesCount !== IDLE && repliesCount - offset * 2
  const leftRepliyes =
    nextLoad && nextLoad > repliesLimit ? repliesLimit : nextLoad

  const Replies = () =>
    replies.length > 0 && (
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography sx={{ color: 'text.secondary' }} onClick={loadReplies}>
            Показать ответы ({repliesCount})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {replies.map(({ text, reply_id, createdAt }) => (
            <Box
              key={reply_id}
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                p: 2,
              }}>
              <Typography>
                {first_name + ' ' + second_name + ' '}
                {getToThisday(createdAt)}
              </Typography>
              <Typography>{text}</Typography>
            </Box>
          ))}
        </AccordionDetails>
        <AccordionSummary>
          {repliesCount !== IDLE && replies.length < repliesCount ? (
            <PrimitiveButton onClick={onLoadMore}>
              Загрузить еще
              {' ' + leftRepliyes}
            </PrimitiveButton>
          ) : (
            <PrimitiveButton>Больше нет комментариев</PrimitiveButton>
          )}
        </AccordionSummary>
      </Accordion>
    )

  if (repliesCount === IDLE) {
    return <Loader />
  }

  return <Replies />
}

export default RepliesFrame
