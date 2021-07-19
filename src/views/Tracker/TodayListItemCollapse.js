import React from 'react'
import { Typography, TextField, Collapse, makeStyles} from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const styles = (theme) => ({
  expanded: {},
  root: {
    width: '100%', 
    // backgroundColor: theme.palette.action.disabled,
    // margin: 0,
    "&$expanded": {
      margin: 0,
      // backgroundColor: theme.palette.action.disabled,
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    width: "120px"
  },
  detail: {
    fontSize: "16px"
  },
  accordion: {
    paddingLeft: "20px"
  },
  accordionDetails: {
    // paddingLeft: "40px"
  }
});

const useStyles = makeStyles(styles);

export default function TodayListItemCollapse(props) {
  const classes = useStyles();

  return (
    <div>
      <Collapse in={props.open} timeout="auto" unmountOnExit>
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
      </Collapse>
    </div>
  )
}
