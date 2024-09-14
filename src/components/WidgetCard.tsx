import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { CardHeader, IconButton } from '@mui/material';
import { useRecoilState } from 'recoil';
import { widgetLayoutSelectorFamily, widgetSelectorFamily } from '../atoms';
import TaskCompletion from '../widgets/TaskCompletion';
import { Close } from '@mui/icons-material';

type CardProps = {
  widgetId: string
}
export default function WidgetCard({ widgetId }: CardProps) {
  const [selectedWidget, setSelectedWidget] = useRecoilState(widgetLayoutSelectorFamily(widgetId));
  const [currentWidget, setCurrentWidget] = useRecoilState(widgetSelectorFamily(widgetId));

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

  const handleRemoveWidget = () => {

    setCurrentWidget((prevState: any) => ({
      ...prevState,
      widgetInUse: false
    }));
  }

  return (
    <>
      <Card sx={{ height: '100%', borderRadius: '0' }} variant='outlined' >
        <CardContent>
          <CardHeader
            action={
              <>
                <IconButton aria-label="settings" onClick={handleClick} className='no-drag'>
                  <MoreVertIcon />
                </IconButton>
                <IconButton aria-label="close" onClick={handleRemoveWidget} className='no-drag'>
                  <Close />
                </IconButton>
              </>
            }
            title={currentWidget?.widgetTitle}
          />
          <TaskCompletion />
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