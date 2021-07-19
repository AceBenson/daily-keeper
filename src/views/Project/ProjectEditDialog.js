import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText,  DialogActions, Button, TextField } from '@material-ui/core';
import { BlockPicker } from 'react-color'

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

  const handleEdit = () => {
    console.log("handleEdit");
    props.editProject(projectName, projectColor);
    props.handleClose();
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select project you want to edit
        </DialogContentText>
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
        <Button variant="contained" onClick={handleEdit} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
