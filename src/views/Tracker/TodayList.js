import React from 'react'

import { List, ListItem, Typography, Grid, Divider, TextField, makeStyles } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  }
});

const useStyles = makeStyles(styles);

export default function TodayList(props) {
  const classes = useStyles();

  return (
    <div>
      <List className={classes.root}>
        {props.workingItemList.map((item, key) => (
          <div key={key}>
            <ListItem>
              <Grid container alignItems="center">
                <Grid item md={2} xs={12}>
                  <Typography variant="h6">
                    {item.project}
                  </Typography>
                </Grid>
                <Grid item md={4} xs={12}>

                </Grid>
                <Grid item md={2} xs={12} align="center">
                  <Typography variant="h6">
                    {
                      ('0'+(item.endTime.getHours()-item.startTime.getHours())).slice(-2) + ":" +
                      ('0'+(item.endTime.getMinutes()-item.startTime.getMinutes())).slice(-2) + ":" +
                      ('0'+(item.endTime.getSeconds()-item.startTime.getSeconds())).slice(-2)
                    }
                  </Typography>
                </Grid>
                <Grid item md={2} xs={12} align="center">
                  <TextField
                    label="Start Time"
                    type="time"
                    defaultValue={
                      ('0'+item.startTime.getHours()).slice(-2) + ":" +
                      ('0'+item.startTime.getMinutes()).slice(-2) + ":" +
                      ('0'+item.startTime.getSeconds()).slice(-2)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 1,
                    }}
                    onChange={(e) => {props.handleStartTimeChange(key, e.target.value);}}
                  />
                </Grid>
                <Grid item md={2} xs={12} align="center">
                  <TextField
                    label="End Time"
                    type="time"
                    defaultValue={
                      ('0'+item.endTime.getHours()).slice(-2) + ":" +
                      ('0'+item.endTime.getMinutes()).slice(-2) + ":" +
                      ('0'+item.endTime.getSeconds()).slice(-2)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 1,
                    }}
                    onChange={(e) => {props.handleEndTimeChange(key, e.target.value);}}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Divider component="li" />
          </div>
        ))}
      </List>
    </div>
  )
}
