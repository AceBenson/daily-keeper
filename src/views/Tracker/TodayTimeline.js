import React from 'react'

import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

const styles = (theme) => ({
  timeline: {
    padding: "0px",
    margin: "0px",
  },
  timelineContent: {
    textAlign: "center",
    padding: "20px 0px",
    margin: "0px",
  },
});

const useStyles = makeStyles(styles);

export default function TodayTimeline(props) {
  const classes = useStyles();

  return (
    <div>
      <Timeline classes={{
        root: classes.timeline
      }}>
        {props.workingItemList.map((item, key) => (
          <TimelineItem key={key} className={classes.timelineItem}>
            <TimelineOppositeContent classes={{
              root: classes.timelineContent
            }}>
              <Paper>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      {item.project}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      {item.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      {('0'+item.startTime.getHours()).slice(-2)}:
                      {('0'+item.startTime.getMinutes()).slice(-2)}:
                      {('0'+item.startTime.getSeconds()).slice(-2)}
                      &nbsp;&nbsp;-&nbsp;&nbsp;
                      {('0'+item.endTime.getHours()).slice(-2)}:
                      {('0'+item.endTime.getMinutes()).slice(-2)}:
                      {('0'+item.endTime.getSeconds()).slice(-2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent classes={{
              root: classes.timelineContent
            }}>
              <Paper>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      {item.project}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      {item.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      {('0'+item.startTime.getHours()).slice(-2)}:
                      {('0'+item.startTime.getMinutes()).slice(-2)}:
                      {('0'+item.startTime.getSeconds()).slice(-2)}
                      &nbsp;&nbsp;-&nbsp;&nbsp;
                      {('0'+item.endTime.getHours()).slice(-2)}:
                      {('0'+item.endTime.getMinutes()).slice(-2)}:
                      {('0'+item.endTime.getSeconds()).slice(-2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
