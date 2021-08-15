import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import { BlockPicker } from 'react-color'

import {  } from '../../api/projectAPI';

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
        <Button variant="contained" onClick={() => props.deleteProject(props._id)} color="secondary">
          Delete
        </Button>
        <Button variant="contained" onClick={() => props.editProject(props._id, projectName, projectColor)} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
