import React from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { BlockPicker } from 'react-color'

import { create_project } from '../../api/projectAPI';

export default function ProjectCreateDialog(props) {
  const projectName = React.useRef("");
  // const projectColor = React.useRef("");
  const [projectColor, setProjectColor] = React.useState("#000000");

  const handleCreate = async () => {
    const data = {name: projectName.current.value, color: projectColor};
    const res = await create_project(data);
    if (res.status === 200) {
      console.log("It's time to create snackbar");
      props.createProject();
    }
    props.handleClose();
  }

  const handleChangeColor = (color) => {
    setProjectColor(color.hex);
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create new project</DialogTitle>
      <DialogContent>
        <TextField 
          inputRef={projectName} 
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
        <Button variant="contained" onClick={handleCreate} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
