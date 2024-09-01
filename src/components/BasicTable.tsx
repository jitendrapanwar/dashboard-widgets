import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Button } from '@mui/material';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const [show, setShow] = React.useState(false)
  const [toggle, setToggle] = React.useState(false)
  return (
    <>
      <ArrowForwardIcon component={motion.svg} onClick={() => setToggle(!toggle)}
        animate={{ rotate: (toggle ? 90 : 0) }}
      />

      <AcUnitIcon component={motion.svg}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 5,
          ease: 'linear',
          repeat: Infinity
        }}
      />
      <Button onClick={() => setShow(!show)}>Show/Hide</Button>
      <AnimatePresence>
        {show &&
          <TableContainer component={motion.table}
            initial={{ y: '-100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '-100vh' }}
            transition={{
              duration: 1,
              ease: 'easeInOut'

            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table"

            >
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    component={motion.tr}
                    layout
                    initial={{ opacity: 0, y: -16, height: 50, }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      borderLeft: `${row.fat > 10 ? '4px solid red' : ''}`
                    }}
                    exit={{
                      height: 'auto',
                    }}
                    whileHover={{
                      height: 60,
                    }}
                    transition={{
                      opacity: { duration: 1 },
                      height: { duration: 0.2 }
                    }}

                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>

        }
      </AnimatePresence>
    </>
  );
}
