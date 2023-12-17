import { useCallback, useEffect, useState } from 'react'
import { TReply, getReplies, getTime } from '../forumMessagesList/actions'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material'
import Loader from '../../../../components/loader/loader'
import Author from '../author/author'

const RepliesFrame = ({ comment_id }: { comment_id: number }) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const [offset, setOffset] = useState(0)
  const [repliesLoad, setReplies] = useState<TReply[]>([])
  const repliesLimit = 10
  const [load, setLoad] = useState(true)

  const loadReplies = useCallback(async () => {
    try {
      const { data } = await getReplies({
        id: comment_id,
        limit: repliesLimit,
        offset: offset,
      })
      const load = [...repliesLoad, ...data]
      setReplies(load)
    } catch (err) {
      console.log(err)
    } finally {
      setLoad(false)
    }
  }, [comment_id, offset])

  useEffect(() => {
    loadReplies()
  }, [comment_id])

  const renderReplies = () =>
    repliesLoad.length > 0 ? (
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography sx={{ color: 'text.secondary' }} onClick={loadReplies}>
            Показать ответы
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {repliesLoad.map(({ text, reply_id, createdAt, creator_id }) => (
            <Typography
              key={reply_id}
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                p: 2,
              }}>
              <Box>
                <Author id={creator_id} />
                {getTime(new Date(createdAt))}
              </Box>
              {text}
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>
    ) : (
      <>Еще нет ответов</>
    )

  return load ? <Loader /> : <>{renderReplies()}</>
}

export default RepliesFrame
