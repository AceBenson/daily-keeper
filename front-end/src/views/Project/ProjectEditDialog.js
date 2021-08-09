import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import { BlockPicker } from 'react-color'

import { update_project, delete_project } from '../../api/projectAPI';

export default function ProjectEditDialog(props) {
  const [projectName, setProjectName] = React.useState(props.name);
  const [projectColor, setProjectColor] = React.useState(props.color);

  React.useEffect(() => {
    if (props.name) {
      setProjectName(props.name);
    }
    if (props.color) {
      setProjectColor(props.color);
    }
  }, [props.name, props.color])

  const handleChangeColor = (color) => {
    setProjectColor(color.hex);
  }

  const handleDelete = async () => {
    const res = await delete_project(props._id);
    if (res.status === 200) {
      console.log("It's time to create snackbar");
      props.deleteProject();
    }
    props.handleClose();
  }

  const handleEdit = async () => {
    const data = {name: projectName, color: projectColor};
    const res = await update_project(props._id, data);
    if (res.status === 200) {
      console.log("It's time to create snackbar");
      props.editProject();
    }
    props.handleClose();
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit project</DialogTitle>
      <DialogContent>
        <TextField
          value={projectName}
          onChange={(event) => {setProjectName(event.target.value)}}
          autoFocus 
          margin="dense" 
          label="Project Name" 
          fullWidth
        />
        <BlockPicker 
          triangle="hide"
          width="100%"
          color={projectColor}
          onChangeComplete={ handleChangeColor }
        />
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleDelete} color="secondary">
          Delete
        </Button>
        <Button variant="contained" onClick={handleEdit} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
