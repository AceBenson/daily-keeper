import React from 'react'
import clsx from 'clsx';
import { Paper, FormControl, Select, MenuItem, Grid, FormHelperText, InputLabel, Button, makeStyles } from '@material-ui/core'
import { Typography } from '@material-ui/core';

const styles = theme => ({
  hidden: {
    display: "none"
  }
});

const useStyles = makeStyles(styles);

export default function WorkingTimer(props) {
  const classes = useStyles();

  // const [workingItem, setWorkingItem] = React.useState({project: "", startTime: new Date(), endTime: new Date()});
  const [isCounting, setIsCounting] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(0);

  // const handleProjectChange = (event) => {
  //   setWorkingItem({...workingItem, project: event.target.value});
  // };
  React.useEffect(() => {
    const timerId = setTimeout(() => {if (isCounting) {setElapsedTime(elapsedTime + 1)}}, 1000);
    return () => clearTimeout(timerId);
  });

  const handleStartTimerBtn = () => {
    if (!props.workingItem.project) {
      alert("Select Porject");
      return;
    }
    setIsCounting(true);
    props.handleStartTimerBtn();
  }

  const handleStopTimerBtn = () => {
    console.log(elapsedTime);
    setIsCounting(false);
    setElapsedTime(0);
    props.handleStopTimerBtn();
  }

  return (
    <div>
      <Paper style={{padding: "6px 12px", margin: "12px 0px"}}>
        <form >
          <Grid container spacing={2} alignItems="center">
            <Grid item md={2} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="project-label">Project</InputLabel>
                <Select
                  labelId="project-label"
                  id="project"
                  value={props.workingItem.project}
                  onChange={props.handleProjectChange}
                >
                  {props.projects.map((item, key) => {
                    return (
                      <MenuItem value={item} key={key}>{item}</MenuItem>
                    )
                  })}
                </Select>
                <FormHelperText>What project are you working on?</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>

            </Grid>
            <Grid item md={2} xs={12}>
             <Typography variant="h6">
              {new Date(elapsedTime * 1000).toISOString().substr(11, 8)}
             </Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Button 
                fullWidth 
                variant="outlined" 
                color="primary" 
                onClick={handleStartTimerBtn} 
                className={clsx({
                  [classes.hidden]: isCounting,
                })}
              >
                start Timer
              </Button>
              <Button 
                fullWidth 
                variant="outlined" 
                color="secondary" 
                onClick={handleStopTimerBtn}
                className={clsx({
                  [classes.hidden]: !isCounting,
                })}
              >
                Stop
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  )
}