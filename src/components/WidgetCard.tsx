import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { LayoutPropsType, WidgetType } from '../types';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import { useRecoilState } from 'recoil';
import { widgetLayoutSelectorFamily, widgetSelectorFamily } from '../atoms';

type CardProps = {
  widgetId: string
}
export default function WidgetCard({ widgetId }: CardProps) {
  const [selectedWidget, setSelectedWidget] = useRecoilState(widgetLayoutSelectorFamily(widgetId));
  const [currentWidget, setCurrentWidget] = useRecoilState(widgetSelectorFamily(widgetId));

  const [minimize, setMinimize] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (key: string) => {

    setSelectedWidget((prevState: any) => ({
      ...prevState,
      static: key === 'isStatic' ? !prevState?.static : prevState?.static,
      isResizable: key === 'isResizable' ? !prevState?.isResizable : prevState?.isResizable,
      isDraggable: key === 'isDraggable' ? !prevState?.isDraggable : prevState?.isDraggable
    }));
  }

  return (
    <>
      <Card>
        <CardContent>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <>
                <IconButton aria-label="settings" onClick={() => setMinimize(!minimize)} className='no-drag'>
                  <UnfoldLessIcon />
                </IconButton>
                <IconButton aria-label="settings" onClick={handleClick} className='no-drag'>
                  <MoreVertIcon />
                </IconButton>
              </>
            }
            title={currentWidget?.widgetTitle}
            subheader="September 14, 2016"
          />
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
        </CardContent>
      </Card>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}

        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleMenuItemClick('isStatic')}>
          <ListItemIcon >
            {selectedWidget?.static ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon />}
          </ListItemIcon>
          Static
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('isResizable')}>
          <ListItemIcon >
            {selectedWidget?.isResizable ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon />}
          </ListItemIcon>
          Resizable
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('isDraggable')}>
          <ListItemIcon >
            {selectedWidget?.isDraggable ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon />}
          </ListItemIcon>
          Draggable
        </MenuItem>
      </Menu>
    </>
  )
}