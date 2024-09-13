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
import { widgetAtoms } from '../atoms';

type CardProps = {
  widget: WidgetType
}
export default function WidgetCard({ widget: selectedWidget }: CardProps) {
  //const [selectedWidget, setSelectedWidget] = useRecoilState(widgetAtomFamily(widget.widgetId));
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

  const handleMenuItemClick = (key: string) => {

    const neww = widgets.map(widget => {
      if (widget.widgetId === selectedWidget.widgetId) {
        return {
          ...widget, layout: {
            ...widget.layout,
            static: key === 'isStatic' ? !selectedWidget.layout.static : selectedWidget.layout.static,
            isResizable: key === 'isResizable' ? !selectedWidget.layout.isResizable : selectedWidget.layout.isResizable,
            isDraggable: key === 'isDraggable' ? !selectedWidget.layout.isDraggable : selectedWidget.layout.isDraggable
          }
        }
      } else {
        return widget;
      }
    })

    // setSelectedWidget({
    //   ...selectedWidget,
    //   layout: {
    //     ...selectedWidget.layout, 
    //     static: key === 'isStatic' ? !selectedWidget.layout.static : selectedWidget.layout.static,
    //   isResizable: key === 'isResizable' ? !selectedWidget.layout.isResizable : selectedWidget.layout.isResizable,
    //   isDraggable: key === 'isDraggable' ? !selectedWidget.layout.isDraggable : selectedWidget.layout.isDraggable
    //   }     
    // })

    setWidgets(neww);

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
            title={selectedWidget?.widgetTitle}
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
            {selectedWidget.layout.static ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon />}
          </ListItemIcon>
          Static
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('isResizable')}>
          <ListItemIcon >
            {selectedWidget.layout.isResizable ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon />}
          </ListItemIcon>
          Resizable
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('isDraggable')}>
          <ListItemIcon >
            {selectedWidget.layout.isDraggable ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon />}
          </ListItemIcon>
          Draggable
        </MenuItem>
      </Menu>
    </>
  )
}