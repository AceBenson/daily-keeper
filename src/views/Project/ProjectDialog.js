import React from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';

export default function ProjectDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create new project</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          
        </DialogContentText> */}
        <TextField autoFocus margin="dense" label="Project Name" fullWidth/>
        <TextField margin="dense" label="Color" fullWidth/>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={props.handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
