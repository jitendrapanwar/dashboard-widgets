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
import { LayoutPropsType } from '../types';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import { useRecoilState } from 'recoil';
import { widgetAtoms, widgetAtomFamily } from '../atoms';

type CardProps = {
  title: string;
  layoutProps: LayoutPropsType
  id: string
}
export default function WidgetCard({ title, layoutProps, id }: CardProps) {
  const [selectedWidget, setSelectedWidget] = useRecoilState(widgetAtomFamily(id));
  const [widgets, setWidgets] = useRecoilState(widgetAtoms)
  const [minimize, setMinimize] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(selectedWidget)
  const handleMenuItemClick = (key: string) => {

    const neww = widgets.map(widget => {
      if (widget.widgetId === selectedWidget.i) {
        return {
          ...widget, layout: {
            ...widget.layout,
            static: key === 'isStatic' ? !selectedWidget.static : selectedWidget.static,
            isResizable: key === 'isResizable' ? !selectedWidget.isResizable : selectedWidget.isResizable,
            isDraggable: key === 'isDraggable' ? !selectedWidget.isDraggable : selectedWidget.isDraggable
          }
        }
      } else {
        return widget;
      }
    })

    setSelectedWidget({
      ...selectedWidget,
      static: !selectedWidget.static,
      isResizable: !selectedWidget.isResizable,
      isDraggable: !selectedWidget.isDraggable
    })

    setWidgets(neww);

  }


  return (
    <>
      <Card sx={{ animation: `${minimize ? 'mymove1' : 'mymove'} 500ms ease-in both` }} >
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
            title={title}
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
            {layoutProps.static ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon />}
          </ListItemIcon>
          Static
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('isResizable')}>
          <ListItemIcon >
            {layoutProps.isResizable ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon />}
          </ListItemIcon>
          Resizable
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('isDraggable')}>
          <ListItemIcon >
            {layoutProps.isDraggable ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon />}
          </ListItemIcon>
          Draggable
        </MenuItem>
      </Menu>
    </>
  )
}