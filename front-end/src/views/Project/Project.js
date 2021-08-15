import React from 'react'
import { makeStyles, Paper, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Fab, Tooltip, Backdrop, CircularProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'

import ProjectRow from './ProjectRow'
import ProjectCreateDialog from './ProjectCreateDialog';
import ProjectEditDialog from './ProjectEditDialog';
import MySnackbar from '../../components/MySnackbar';

import { read_projects, create_project, update_project, delete_project } from '../../api/projectAPI';

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer-1,
    color: '#fff',
  }
});

const useStyles = makeStyles(styles);


export default function Project() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState("");
  
  const [openCrate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedIdx, setSelectedIdx] = React.useState(-1);

  const [projects, setProjects] = React.useState([]);

  const fetchDataAndSetProject = async () => {
    const res = await read_projects();
    if (res.status === 200)
      setProjects(res.data);
    else
      console.log(res);
  }

  React.useEffect(() => {
    fetchDataAndSetProject();
  }, []);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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

  const createProject = async (name, color) => {
    const data = {name: name, color: color};
    const res = await create_project(data);
    if (res.status === 200) {
      setProjects([
        ...projects,
        res.data
      ]);
      setInfo("Project entry has been created.");
      setOpen(true);
    } else {
      console.log(res);
    }
    handleCreateClose();
  }

  const editProject = async (_id, name, color) => {
    const data = {name: name, color: color};
    const res = await update_project(_id, data);
    if (res.status === 200) {
      setSelectedIdx(-1);
      setProjects(projects.map(project => project._id === _id ? Object.assign({}, project, res.data) : project));
      setInfo("Update project successfully.");
      setOpen(true);
    } else {
      console.log(res);
    }
    handleEditClose();
  }

  const deleteProject = async (_id) => {
    const res = await delete_project(_id);
    if (res.status === 200) {
      setSelectedIdx(-1);
      setProjects(projects.filter(project => project._id !== _id))
      setInfo("Delete project successfully.");
      setOpen(true);
    } else {
      console.log(res);
    }
    handleEditClose();
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
            {
              projects && projects.map((project, index) => (
                <ProjectRow 
                  key={project.name}
                  project={project}
                  index={index}
                  selectedIdx={selectedIdx}
                  handleClick={handleClick} 
                />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Backdrop className={classes.backdrop} open={projects.length === 0}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* {projects.length === 0 && <LinearProgress />} */}
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
      <MySnackbar
        open={open}
        handleClose={handleClose}
        info={info}
      />
    </div>
  )
}
