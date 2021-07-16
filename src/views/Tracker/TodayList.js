import React from 'react'
import { List, makeStyles } from '@material-ui/core';
import TodayListItem from '../TodayListItem';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.info.light
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
            handleAddProgress={props.handleAddProgress}
            handleAddTodo={props.handleAddTodo}
          />
        ))}
      </List>
    </div>
  )
}
