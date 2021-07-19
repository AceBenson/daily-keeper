import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText,  DialogActions, Button } from '@material-ui/core';

export default function ProjectEditDialog(props) {

  const handleEdit = () => {
    console.log("handleEdit");
    props.handleClose();
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select project you want to edit
        </DialogContentText>
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
