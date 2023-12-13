import { memo, useCallback, useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'

export interface IForum {
  perPageValue: number
}

const ForumPerPage = ({ perPageValue }: IForum) => {
  const perPageValues = [10, 20, 30]
  const [perPage, setPerPage] = useState(perPageValue)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setAnchorEl(event.currentTarget),
    []
  )
  const handleClose = useCallback(() => setAnchorEl(null), [])

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        {perPage}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        {perPageValues.map(item => (
          <MenuItem onClick={() => setPerPage(item)} />
        ))}
      </Menu>
    </div>
  )
}

export default memo(ForumPerPage)
