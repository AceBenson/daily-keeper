import React from 'react'
import { Paper, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Fab, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'

import ProjectRow from './ProjectRow'
import ProjectCreateDialog from './ProjectCreateDialog';
import ProjectEditDialog from './ProjectEditDialog';

import { read_projects } from '../../api/projectAPI';

export default function Project() {
  const [openCrate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedIdx, setSelectedIdx] = React.useState(-1);

  const [projects, setProjects] = React.useState([]);

  const fetchDataAndSetProject = async () => {
    const res = await read_projects();
    if (res.status === 200)
      setProjects(res.data);
  }

  React.useEffect(() => {
    fetchDataAndSetProject();
  }, []);


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

  const createProject = () => {
    fetchDataAndSetProject();
  }

  const editProject = () => {
    fetchDataAndSetProject();
  }

  const deleteProject = () => {
    setSelectedIdx(-1);
    fetchDataAndSetProject();
  }

  const handleClick = (index) => {
    if (index === selectedIdx)
      setSelectedIdx(-1);
    else
      setSelectedIdx(index);
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
            {projects && projects.map((project, index) => (
              <ProjectRow 
                key={project.name}
                project={project}
                index={index}
                selectedIdx={selectedIdx}
                handleClick={handleClick} 
              />
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
        <span>
          <Fab
            disabled={selectedIdx === -1}
            style={{float: "right", margin: "20px 20px 0px 0px"}}
            onClick={handleEditOpen}
          >
            <EditIcon />
          </Fab>
        </span>
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
        deleteProject={deleteProject}
        _id={selectedIdx === -1 ? -1 : projects[selectedIdx]._id}
        name={selectedIdx === -1 ? "" : projects[selectedIdx].name}
        color={selectedIdx === -1 ? "" : projects[selectedIdx].color}
      />
    </div>
  )
}
