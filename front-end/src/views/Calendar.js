import React from 'react'
import clsx from 'clsx';
import { Typography, makeStyles } from '@material-ui/core'

const styles = (theme) => ({
  wrapper: {
    padding: "40px 0px"
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

    // top: "130px",
    // height: "elapsed",
    // borderLeft: "2px solid red",
  },

  today: {
    color: theme.palette.primary.light
  }
});

const useStyles = makeStyles(styles);

export default function Calendar() {
  const classes = useStyles();
  const today = new Date();
  const [todayEvents, setTodayEvents] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/getDayEvent")
      .then((res) => res.json())
      .then((todayEvents) => {
        console.log(todayEvents);
        setTodayEvents(todayEvents);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.wrapper}>
      <Typography variant="h4">
        h4. Calendar
      </Typography>
      <div className={classes.table}>

        <div className={classes.timeInfo}>
          <div className={classes.timeTitle}>Time Info</div>
          <div>
            {[...Array(24).keys()].slice(1).map((hour, key) => (
              <div key={key} className={classes.timeCell}>
                <span className={classes.timeCellSpan}>{hour}:00</span>
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
                  [classes.today]: (today.getDay() - (key+1) === 0),
                })}
              >
                {day}, {today.getMonth()+1}/{today.getDate() - (today.getDay() - (key+1))}
              </Typography>
            </div>
            <div>
              <div>
                {[...Array(24).keys()].map((hour, key) => (
                  <div key={key} className={classes.dayCell}>
                    
                  </div>
                ))}
              </div>
              <div className={classes.entriesWrapper}>
                {(today.getDay() === key+1) && todayEvents.map((event, key) => (
                  <div 
                    key={key}
                    className={classes.entry}
                    style={{
                      height: event.elapsedTime/1000/60,
                      top: 60 + new Date(event.startTime).getHours() * 60 + new Date(event.startTime).getMinutes(),
                      borderLeft: "3px solid " + event.color,
                    }}
                  >
                    {event.project}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
