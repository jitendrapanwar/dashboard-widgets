import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import SyncDisabledOutlinedIcon from '@mui/icons-material/SyncDisabledOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import policiesJSON from '../fixtures/policies.json'

interface IPolicies {
  name: string
  executionDateTime: string;
  status: string;
  executionTime: string;
}

const steps: IPolicies[] = policiesJSON['abcd-client'][0].policies;

export default function VerticalLinearStepper() {
  const [policies, setPolicies] = React.useState<any>()

  const renderStepIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <TaskAltIcon color='success' />
      case 'IN-PROGRESS':
        return <SyncOutlinedIcon color='warning' />
      case 'FAILED':
        return <CancelOutlinedIcon color='error' />
      default:
        return <PendingOutlinedIcon />
    }
  }

  // count total policies 

  React.useEffect(() => {
    const result = steps.reduce((acc: any, cur) => {
      const key = cur.name;
      if (!acc[key]) {
        acc[key] = 1

      } else {
        acc[key] += 1
      }
      return acc;
    }, []);

    console.log(result)
    setPolicies(result)
  }, [])

  return (
    <>
      <Stack direction="row" spacing={1} mb={3}>
        {
          policies && Object.keys(policies).map((p: any) => <Chip key={p} label={`${p} (${policies[p]})`} color='primary' />)
        }
      </Stack>

      <Box sx={{ maxWidth: 400, maxHeight: 200, overflow: 'auto' }}>

        <Stepper orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index} active>
              <StepLabel icon={renderStepIcon(step.status)} error={step.status === 'FAILED'}>
                <Typography variant='body1'>{step.name}</Typography>

              </StepLabel>
              <StepContent>
                <Stack direction={'row'} spacing={1}>
                  <CalendarMonthIcon fontSize='small' />
                  <Typography variant='subtitle2' sx={{ color: 'gray' }}>{step.executionDateTime}</Typography>
                </Stack>

                <Stack direction={'row'} spacing={1}>
                  <AvTimerIcon fontSize='small' />
                  <Typography variant='body2' sx={{ color: 'gray' }}>{step.executionTime}</Typography>
                </Stack>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
}
