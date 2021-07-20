import React from 'react'
import { ListItem, Typography, Grid, TextField, Divider} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TodayListItemCollapse from './TodayListItemCollapse'

export default function TodayListItem(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <Grid container alignItems="center">
          <Grid item md={2} xs={12}>
            <Typography variant="h6">
              {props.item.project}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>

          </Grid>
          <Grid item md={2} xs={12} align="center">
            <Typography variant="h6">
              {
                ('0'+(props.item.endTime.getHours()-props.item.startTime.getHours())).slice(-2) + ":" +
                ('0'+(props.item.endTime.getMinutes()-props.item.startTime.getMinutes())).slice(-2) + ":" +
                ('0'+(props.item.endTime.getSeconds()-props.item.startTime.getSeconds())).slice(-2)
              }
            </Typography>
          </Grid>
          <Grid item md={2} xs={12} align="center">
            <TextField
              label="Start Time"
              type="time"
              defaultValue={
                ('0'+props.item.startTime.getHours()).slice(-2) + ":" +
                ('0'+props.item.startTime.getMinutes()).slice(-2) + ":" +
                ('0'+props.item.startTime.getSeconds()).slice(-2)
              }
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 1,
              }}
              onChange={(e) => {props.handleStartTimeChange(props.index, e.target.value);}}
            />
          </Grid>
          <Grid item md={2} xs={12} align="center">
            <TextField
              label="End Time"
              type="time"
              defaultValue={
                ('0'+props.item.endTime.getHours()).slice(-2) + ":" +
                ('0'+props.item.endTime.getMinutes()).slice(-2) + ":" +
                ('0'+props.item.endTime.getSeconds()).slice(-2)
              }
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 1,
              }}
              onChange={(e) => {props.handleEndTimeChange(props.index, e.target.value);}}
            />
          </Grid>
        </Grid>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <TodayListItemCollapse 
        open={open}
        handleEditProgress={props.handleEditProgress}
        handleEditTodo={props.handleEditTodo}
        item={props.item}
        index={props.index}
      />
      <Divider />
    </div>
  )
}
