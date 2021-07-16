import React from 'react'
import { List, ListItem, Typography, Grid, TextField, Collapse, Button, makeStyles} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';

const styles = (theme) => ({
  collapse: {
    backgroundColor: theme.palette.background.paper, 
    padding: "20px"
  }
});

const useStyles = makeStyles(styles);

export default function TodayListItem(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const progressInput = React.useRef("");
  const todoInput = React.useRef("");

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
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit className={classes.collapse}>
        <Grid container>
          <Grid item md={6} xs={12} align="center">
            <Typography variant="body1" gutterBottom>
              Progress
            </Typography>
            <Grid container>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <TextField 
                  fullWidth
                  inputRef={progressInput}
                  // inputProps={{style: { textAlign: 'center' }}}
                />
              </Grid>
              <Grid item xs={2}>
                <Button onClick={() => props.handleAddProgress(props.index, progressInput.current.value)}>
                  <SendIcon/>
                </Button>
              </Grid>
            </Grid>
            <List>
              {props.item.progress.map((value, key) => (
                <ListItem key={key} style={{justifyContent:'center'}}>
                  {value}
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item md={6} xs={12} align="center">
            <Typography variant="body1" gutterBottom>
              To-do
            </Typography>
            <Grid container>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <TextField 
                  fullWidth
                  inputRef={todoInput}
                  // inputProps={{style: { textAlign: 'center' }}}
                />
              </Grid>
              <Grid item xs={2}>
                <Button onClick={() => props.handleAddTodo(props.index, todoInput.current.value)}>
                  <SendIcon/>
                </Button>
              </Grid>
            </Grid>
            <List>
              {props.item.todo.map((value, key) => (
                <ListItem key={key} style={{justifyContent:'center'}}>
                  {value}
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Collapse>
    </div>
  )
}
