import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function GroupSizesColors() {
  const [selected, setSelected] = React.useState(0)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup color="secondary" aria-label="Medium-sized button group">
        <Button key="one" variant={selected === 1 ? 'contained' : 'outlined'} onClick={() => setSelected(1)} >One</Button>,
        <Button key="two" variant={selected === 2 ? 'contained' : 'outlined'} onClick={() => setSelected(2)}>Two</Button>,
        <Button key="three" variant={selected === 3 ? 'contained' : 'outlined'} onClick={() => setSelected(3)}>Three</Button>,
      </ButtonGroup>
    </Box>
  );
}
