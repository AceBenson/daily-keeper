import { Dialog, DialogTitle, DialogContent, Typography, TextField, Grid, DialogActions, Button } from '@material-ui/core'
import React from 'react'
import {intervalToDuration  } from 'date-fns'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export default function DetailDialog(props) {
  const [event, setEvent] = React.useState(null);

  React.useEffect(() => {
    setEvent(props.currentEvent && props.currentEvent.event);
  }, [props.currentEvent]);

  const handleStartTimeChange = (value) => {
    let new_start_time = new Date(event.start_time); // new Date, so this won't modify props.currentEvnet
    new_start_time.setHours(value.substr(0, 2));
    new_start_time.setMinutes(value.substr(3, 2));
    new_start_time.setSeconds(value.substr(6, 2));


    setEvent({
      ...event,
      start_time: new_start_time,
      elapsed_time: event.end_time - new_start_time,
    });
  }

  const handleEndTimeChange = (value) => {
    let new_end_time =  new Date(event.end_time); // new Date, so this won't modify props.currentEvnet
    new_end_time.setHours(value.substr(0, 2));
    new_end_time.setMinutes(value.substr(3, 2));
    new_end_time.setSeconds(value.substr(6, 2));
    setEvent({
      ...event,
      end_time: new_end_time,
      elapsed_time: new_end_time - event.start_time,
    });
  }

  const handleEditProgress = (value) => {
    setEvent({
      ...event,
      progress: value
    })
  }

  const handleEditTodo = (value) => {
    setEvent({
      ...event,
      todo: value
    })
  }

  const handleCancel = () => {
    setEvent(props.currentEvent.event);
    props.handleClose();
  }

  const handleDelete = () => {
    props.handleDelete(event._id, props.currentEvent.key, props.currentEvent.event_key);
    props.handleClose();
  }

  const handleUpdate = async () => {
    let newEvent = await props.handleUpdate(event, props.currentEvent.key, props.currentEvent.event_key);
    setEvent(newEvent);
    props.handleClose();
  }

  return event && (
    <Dialog fullWidth open={props.open} onClose={handleCancel} >
      <DialogTitle id="form-dialog-title">
        <Grid container justify="space-between">
          <Grid item>
          {event.project.name}
          </Grid>
          <Grid item>
          {
            Object.entries(intervalToDuration({
              start: event.start_time, 
              end: event.end_time
            })).map((data, index) => {
              const targets = ["hours", "minutes", "seconds"]
              return targets.indexOf(data[0]) !== -1 && (('0'+data[1]).slice(-2) + (index === 5 ? "" : ":"))
            })
          }
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center" style={{marginBottom: "20px"}}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Start Time"
              type="time"
              defaultValue={
                ('0'+event.start_time.getHours()).slice(-2) + ":" +
                ('0'+event.start_time.getMinutes()).slice(-2) + ":" +
                ('0'+event.start_time.getSeconds()).slice(-2)
              }
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 1,
              }}
              onChange={(e) => {handleStartTimeChange(e.target.value);}}
              // onClick={(e) => {e.stopPropagation();}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="End Time"
              type="time"
              defaultValue={
                ('0'+event.end_time.getHours()).slice(-2) + ":" +
                ('0'+event.end_time.getMinutes()).slice(-2) + ":" +
                ('0'+event.end_time.getSeconds()).slice(-2)
              }
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 1,
              }}
              onChange={(e) => {handleEndTimeChange(e.target.value);}}
              // onClick={(e) => {e.stopPropagation();}}
            />
          </Grid>
        </Grid>
        {
          [
            {
              "name": "Progress",
              "content": event.progress,
              "editContent": handleEditProgress,
              "icon": <CheckCircleIcon style={{marginRight: "5px"}} />, 
            }, 
            {
              "name": "Todo",
              "content": event.todo,
              "editContent": handleEditTodo,
              "icon": <CheckCircleOutlineIcon style={{marginRight: "5px"}} />, 
            }
          ].map((detail, key) => (
            <div key={key} style={{display: "flex", alignItems: "center"}} wrap='nowrap'>
              {detail.icon}
              <Typography style={{width: "100px"}}>
                {detail.name}
              </Typography>
              <TextField 
                fullWidth
                value={detail.content}
                onChange={event => detail.editContent(event.target.value)}
              />
            </div>
          ))
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>

    </Dialog>
  )
}
