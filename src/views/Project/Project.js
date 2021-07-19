import React from 'react'
import { Paper, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Fab, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'

import ProjectRow from './ProjectRow'
import ProjectCreateDialog from './ProjectCreateDialog';
import ProjectEditDialog from './ProjectEditDialog';

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
  const [openCrate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleCreateOpen = () => {
    setOpenCreate(true);
  };

  const handleCreateClose = () => {
    setOpenCreate(false);
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const createProject = (name, color) => {
    rows.push(createData(name, color, 0, "Not Started"));
  }

  const editProject = (name, color) => {

  }

  return (
    <div>
      <Typography variant="h4" style={{margin: "20px"}}>
        Project
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
          onClick={handleCreateOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Edit">
        <Fab 
          style={{float: "right", margin: "20px 20px 0px 0px"}}
          onClick={handleEditOpen}
        >
          <EditIcon />
        </Fab>
      </Tooltip>
      <ProjectCreateDialog 
        open={openCrate}
        handleClose={handleCreateClose}
        createProject={createProject}
      />
      <ProjectEditDialog 
        open={openEdit}
        handleClose={handleEditClose}
        editProject={editProject}
      />
    </div>
  )
}
