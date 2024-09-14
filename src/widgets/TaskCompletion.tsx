import { Stack, Typography } from '@mui/material'
import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';

export default function TaskCompletion() {
  return (
    <Stack direction='column' alignContent={'flex-end'} spacing={1}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'} spacing={2}>
          <Typography variant='h4'>92%</Typography>
          <Typography variant='h6' color='green'>2%</Typography>
        </Stack>

        <Stack direction={'row'} spacing={0} alignItems={'flex-end'}>
          <Typography variant='h4'>3415</Typography>
          <Typography variant='h6' color='text.secondary'>/4000</Typography>
        </Stack>
      </Stack>
      <LinearProgress color="success" value={92} variant='determinate' sx={{ height: '8px' }} />
      <Typography variant='caption' color='text.secondary'>all most all tasks are completed on time</Typography>
    </Stack>

  )
}