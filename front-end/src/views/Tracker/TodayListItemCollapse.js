import React from 'react'
import { Typography, TextField, Collapse, makeStyles, Button} from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const styles = (theme) => ({
  // expanded: {},
  // root: {
  //   width: '100%', 
  //   // backgroundColor: theme.palette.action.disabled,
  //   // margin: 0,
  //   "&$expanded": {
  //     margin: 0,
  //     // backgroundColor: theme.palette.action.disabled,
  //   }
  // },
  collapse: {
    backgroundColor: theme.palette.background.paper
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    width: "120px"
  },
  detail: {
    fontSize: "16px"
  },
});

const useStyles = makeStyles(styles);

export default function TodayListItemCollapse(props) {
  const classes = useStyles();

  return (
    <div>
      <Collapse in={props.open} timeout="auto" unmountOnExit className={classes.collapse}>
        {
          [
            {
              "name": "Progress",
              "content": props.item.progress,
              "editContent": props.handleEditProgress,
              "icon": <CheckCircleIcon style={{marginRight: "5px"}} />, 
            }, 
            {
              "name": "Todo",
              "content": props.item.todo,
              "editContent": props.handleEditTodo,
              "icon": <CheckCircleOutlineIcon style={{marginRight: "5px"}} />, 
            }
          ].map((detail, key) => (
            <div key={key} style={{margin: "20px", display: "flex", alignItems: "center"}} wrap='nowrap'>
              {detail.icon}
              <Typography className={classes.heading}>
                {detail.name}
              </Typography>
              <TextField 
                fullWidth
                value={detail.content}
                onChange={event => detail.editContent(props.index, event.target.value)}
              />
            </div>
          ))
        }
        <Button style={{float: "right", margin: "10px"}} variant="contained" color="primary" onClick={ () => props.handleUpdateInfo(props.index, props.item.progress, props.item.todo)}>
          UPDATE
        </Button>
        <Button style={{float: "right", margin: "10px"}} variant="contained" color="secondary" onClick={ () => props.handleDeleteItem(props.index)}>
          DELETE
        </Button>
      </Collapse>
    </div>
  )
}
