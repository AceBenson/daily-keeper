import React from 'react'
import { List, makeStyles } from '@material-ui/core';
import TodayListItem from './TodayListItem';

const styles = (theme) => ({
  root: {
    // backgroundColor: "rgb(20, 20, 20)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "10px 5px 5px black",
  }
});

const useStyles = makeStyles(styles);

export default function TodayList(props) {
  const classes = useStyles();

  return (
    <div>
      <List className={classes.root}>
        {props.workingItemList.map((item, key) => (
          <TodayListItem
            item={item}
            key={key}
            index={key}
            handleStartTimeChange={props.handleStartTimeChange}
            handleEndTimeChange={props.handleEndTimeChange}
            handleEditProgress={props.handleEditProgress}
            handleEditTodo={props.handleEditTodo}
          />
        ))}
      </List>
    </div>
  )
}
