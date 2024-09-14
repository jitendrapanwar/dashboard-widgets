import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader, IconButton } from '@mui/material';
import { useRecoilState } from 'recoil';
import { widgetSelectorFamily } from '../atoms';
import TaskCompletion from '../widgets/TaskCompletion';
import { Close } from '@mui/icons-material';
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

  return (
    <>
      <Card sx={{ height: '100%', borderRadius: '0' }} variant='outlined' >
        <CardContent>
          <CardHeader
            action={
              <>
                <WidgetOptions widgetId={widgetId} />

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
    </>
  )
}