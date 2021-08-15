import React from 'react'
import { Snackbar, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.success.main,
    color: "white"
  }
});

const useStyles = makeStyles(styles);


export default function MySnackbar(props) {
  const classes = useStyles();

  return (
    <div>
      <Snackbar
        ContentProps={{
          className: classes.root
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose}
        message={props.info}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={props.handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
      </Snackbar>
    </div>
  )
}
