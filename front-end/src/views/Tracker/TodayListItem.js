import React from 'react'
import { ListItem, Typography, Grid, TextField, Divider} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TodayListItemCollapse from './TodayListItemCollapse'
import {intervalToDuration  } from 'date-fns'

export default function TodayListItem(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem button onClick={handleClick} style={{borderLeft: "2px solid "+props.item.project.color}}>
        <Grid container alignItems="center">
          <Grid item md={2} xs={12}>
            <Typography variant="h6">
              {props.item.project.name}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>

          </Grid>
          <Grid item md={2} xs={12} align="center">
            <Typography variant="h6">
              {
                Object.entries(intervalToDuration({
                  start: props.item.start_time, 
                  end: props.item.end_time
                })).map((data, index) => {return data[1] !== 0 && (('0'+data[1]).slice(-2) + (index === 5 ? "" : ":"))})
              }
            </Typography>
          </Grid>
          <Grid item md={2} xs={12} align="center">
            <TextField
              label="Start Time"
              type="time"
              defaultValue={
                ('0'+props.item.start_time.getHours()).slice(-2) + ":" +
                ('0'+props.item.start_time.getMinutes()).slice(-2) + ":" +
                ('0'+props.item.start_time.getSeconds()).slice(-2)
              }
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 1,
              }}
              onChange={(e) => {props.handleStartTimeChange(props.index, e.target.value);}}
              onClick={(e) => {e.stopPropagation();}}
            />
          </Grid>
          <Grid item md={2} xs={12} align="center">
            <TextField
              label="End Time"
              type="time"
              defaultValue={
                ('0'+props.item.end_time.getHours()).slice(-2) + ":" +
                ('0'+props.item.end_time.getMinutes()).slice(-2) + ":" +
                ('0'+props.item.end_time.getSeconds()).slice(-2)
              }
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 1,
              }}
              onChange={(e) => {props.handleEndTimeChange(props.index, e.target.value);}}
              onClick={(e) => {e.stopPropagation();}}
            />
          </Grid>
        </Grid>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <TodayListItemCollapse 
        open={open}
        handleEditProgress={props.handleEditProgress}
        handleEditTodo={props.handleEditTodo}
        handleUpdateInfo={props.handleUpdateInfo}
        handleDeleteItem={props.handleDeleteItem}
        item={props.item}
        index={props.index}
      />
      <Divider />
    </div>
  )
}
