import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader, IconButton } from '@mui/material';
import { useRecoilState } from 'recoil';
import { widgetSelectorFamily } from '../atoms';
import TaskCompletion from '../widgets/TaskCompletion';
import { Add, Close } from '@mui/icons-material';
import WidgetOptions from './WidgetOptions';

type CardProps = {
  widgetId: string
}
export default function WidgetCard({ widgetId }: CardProps) {
  const [currentWidget, setCurrentWidget] = useRecoilState(widgetSelectorFamily(widgetId));

  const handleRemoveWidget = () => {
    setCurrentWidget((prevState: any) => ({
      ...prevState,
      widgetInUse: false
    }));
  }

  const handleAddWidget = () => {
    setCurrentWidget((prevState: any) => ({
      ...prevState,
      widgetInUse: true
    }));
  }

  return (
    <>
      <Card sx={{ height: '100%', borderRadius: '0' }} variant='outlined' >
        <CardContent>
          <CardHeader
            action={
              <>
                {currentWidget?.widgetInUse ?
                  <>
                    <WidgetOptions widgetId={widgetId} />

                    <IconButton aria-label="close" onClick={handleRemoveWidget} className='no-drag'>
                      <Close />
                    </IconButton>
                  </>
                  : <IconButton aria-label="close" onClick={handleAddWidget} className='no-drag'>
                    <Add />
                  </IconButton>
                }
              </>
            }
            title={currentWidget?.widgetTitle}
          />
          <TaskCompletion />
        </CardContent>
      </Card>
    </>
  )
}