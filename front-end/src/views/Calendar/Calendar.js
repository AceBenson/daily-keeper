import React from 'react'
import clsx from 'clsx';
import { Grid, Typography, makeStyles, IconButton, Backdrop, CircularProgress  } from '@material-ui/core'

import { delete_workingitem, read_workingitems_week } from '../../api/workingitemAPI';
import { addMinutes, addWeeks, eachDayOfInterval, format, isToday, lastDayOfWeek, startOfDay, startOfWeek } from 'date-fns';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import DetailDialog from './DetailDialog';

import { update_workingitem } from '../../api/workingitemAPI';

const styles = (theme) => ({
  wrapper: {
    paddingBottom: "40px"
  },
  root: {
    flexGrow: 1,
  },

  table: {
    display: "flex",
    backgroundColor: theme.palette.background.paper
  },

  timeInfo: {
    flexShrink: 0,
    width: "100px",
  },
  timeTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",

    backgroundColor: "rgb(20, 20, 20)"
  },
  timeCell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",

    padding: "0px 10px",
  },
  timeCellSpan: {
    width: "100%",
    transform: "translateY(30px)",
    textAlign: "right"
  },

  dayInfo: {
    width: "calc(100% - 80px)",
    position: "relative"
  },
  dayTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",

    borderLeft: "1px solid white",
    backgroundColor: "rgb(20, 20, 20)"
  }, 
  dayCell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",

    borderTop: "1px dashed white",
    borderLeft: "1px dashed white",
  },

  entriesWrapper: {
    position: "absolute",
    top: 0,
    left: "2%",
    bottom: 0,
    display: "flex",
    width: "98%",
    height: "100%",
  },
  entry: {
    position: "absolute",
    width: "98%",
    backgroundColor: "rgb(100, 100, 100)",
    paddingLeft: "5px"
    
    // top: "130px",
    // height: "elapsed",
    // borderLeft: "2px solid red",
  },

  today: {
    color: theme.palette.primary.light
  },

  backdrop: {
    zIndex: theme.zIndex.drawer-1,
    color: '#fff',
  }
});

const useStyles = makeStyles(styles);

export default function Calendar() {
  const classes = useStyles();
  const [pivotDay, setPivotDay] = React.useState(new Date());
  const [cellInterval, setCellInterval] = React.useState(60);
  const [events, setEvents] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [currentEvent, setCurrentEvent] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentTop, setCurrentTop] = React.useState(60 + (new Date().getHours() * 60 + new Date().getMinutes()) / cellInterval * 60)

  React.useEffect(() => {
    const fetchAndSetData = async () => {
      const startDay = startOfWeek(pivotDay, { weekStartsOn: 1 });
      const endDay = lastDayOfWeek(pivotDay, { weekStartsOn: 1 });
      const days = eachDayOfInterval({
        start: startDay,
        end: endDay
      });
      const datas = days.map(day => {return {params: {date: day}}})
      const workingitem_res = await read_workingitems_week(datas);
      if (workingitem_res[0].status === 200){
        setIsLoading(false);
        // setEvents(workingitem_res.map((day) => day.data));
        setEvents(workingitem_res.map((day) => {
          return day.data.map((event) => {
            return {
              ...event,
              start_time: new Date(event.start_time),
              end_time: new Date(event.end_time)
            }
          })
        }));
      } 
      else
        console.log(workingitem_res);
    }
    
    fetchAndSetData();
    
  }, [pivotDay]);

  React.useEffect(() => {
    let timer = setInterval(() => {
      setCurrentTop(60 + (new Date().getHours() * 60 + new Date().getMinutes()) / cellInterval * 60)
    }, 30000);
    return () => {
      clearInterval(timer);
    }
  }, [cellInterval])

  const handleEventClick = (event, key, event_key) => {
    setCurrentEvent({
      event: event,
      key: key,
      event_key: event_key,
    });
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleDelete = async (_id, key, event_key) => {
    const res = await delete_workingitem(_id);

    if (res.status === 200) {
      const newEvents = [...events];
      newEvents[key].splice(event_key, 1);
      setEvents(newEvents);
      setCurrentEvent(null);
    } else {
      console.log(res);
    }
  }

  const handleUpdate = async (event, key, event_key) => {
    const res = await update_workingitem(event._id, event);

    if (res.status === 200) {
      setEvents(events.map((item1, index1) => {
        return item1.map((item2, index2) => {
          if (index1 === key && index2 === event_key)
            return {
              ...event,
              // start_time: new Date(event.start_time),
              // end_time: new Date(event.end_time),
            }
          else
            return {...item2}
        });
      }));
      setCurrentEvent({
        event: event,
        key: key,
        event_key: event_key,
      });
    } else {
      console.log(res);
    }

    return event;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" style={{margin: "20px"}}>
              Calendar
            </Typography>
          </Grid>
          <Grid item>
            <IconButton component="span" onClick={() => {setIsLoading(true); setPivotDay(addWeeks(pivotDay, -1))}}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton component="span" onClick={() => {setIsLoading(true); setPivotDay(addWeeks(pivotDay, 1))}}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
      <div className={classes.table}>

        <div className={classes.timeInfo}>
          <div className={classes.timeTitle}>
            <IconButton component="span" onClick={() => setCellInterval(Math.min(240, cellInterval*2))}>
              <RemoveIcon />
            </IconButton >
            <IconButton component="span" onClick={() => setCellInterval(Math.max(15, cellInterval/2))}>
              <AddIcon />
            </IconButton >
          </div>
          <div>
            {[...Array(24*60/cellInterval).keys()].slice(1).map((index, key) => (
              <div key={key} className={classes.timeCell}>
                <span className={classes.timeCellSpan}>
                  {format(addMinutes(startOfDay(new Date()) ,index*cellInterval), "HH:mm")}
                </span>
              </div>
            ))}
            <div className={classes.timeCell}></div>
          </div>
        </div>

        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, key) => (
          <div key={key} className={classes.dayInfo}>
            <div className={classes.dayTitle}>
              <Typography 
                className={clsx({
                  [classes.today]: (isToday(pivotDay) && new Date().getDay() - (key+1) === 0),
                })}
              >
                {day}, {pivotDay.getMonth()+1}/{pivotDay.getDate() - (pivotDay.getDay() - (key+1))}
              </Typography>
            </div>
            <div>
              {/* cells */}
              <div>
                {[...Array(24*60/cellInterval).keys()].map((hour, key) => (
                  <div key={key} className={classes.dayCell}>
                    
                  </div>
                ))}
              </div>
              {/* current red bar */}
              <div className={classes.entriesWrapper}>
                {
                  isToday(pivotDay) && new Date().getDay() - (key+1) === 0 && 
                  <div style={{
                    position: "absolute",
                    height: 2,
                    width: "100%",
                    background: "red",
                    top: currentTop,
                  }}>
                  </div>
                }
              </div>
              {/* events */}
              <div className={classes.entriesWrapper}>
                {events.length !== 0 && events[key].map((event, event_key) => (
                  <div 
                    key={event_key}
                    className={classes.entry}
                    style={{
                      height: Math.max(event.elapsed_time/1000/cellInterval, 20), 
                      top: 60 + (event.start_time.getHours() * 60 + event.start_time.getMinutes()) / cellInterval * 60,
                      borderLeft: "3px solid " + event.project.color,
                      cursor:'pointer',
                      // backgroundColor: event.color.replace(')', ', 0.3)').replace('rgb', 'rgba')
                    }}
                    onClick={() => handleEventClick(event, key, event_key)}
                  >
                    {event.project.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DetailDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        currentEvent={currentEvent}
      />
    </div>
  )
}
