import React from 'react'
import { Paper, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Fab, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

import ProjectRow from './ProjectRow'
import ProjectDialog from './ProjectDialog';

function createData(name, color, tracked, status) {
  return {
    name,
    color,
    tracked,
    status,
    history: [
      { date: '2020-01-02', elapsedTime: '02:45:35', progress: "Build a basic skeleton", todo: "Generate something" },
      { date: '2020-01-05', elapsedTime: '01:20:15', progress: "Create a new table", todo: "Test"},
    ],
  };
}

const rows = [
  createData('Course', 'rgb(255, 0, 0)', 156.1, "In Progress"),
  createData('Web', 'rgb(0, 255, 0)', 30.3, "Not Started"),
  createData('Machine Learning', 'rgb(0, 0, 255)', 300, "Completed"),
]

export default function Project() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" style={{margin: "20px"}}>
        h4. Project
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Project Name</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Tracked</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <ProjectRow key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Tooltip title="Add">
        <Fab 
          color="primary"
          style={{float: "right", marginTop: "20px"}}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <ProjectDialog 
        open={open}
        handleClose={handleClose}
      />
    </div>
  )
}
