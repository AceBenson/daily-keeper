import React from 'react'
import { List, makeStyles, Backdrop, CircularProgress } from '@material-ui/core';
import TodayListItem from './TodayListItem';

const styles = (theme) => ({
  root: {
    // backgroundColor: "rgb(20, 20, 20)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "10px 5px 5px black",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer-1,
    color: '#fff',
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
            handleUpdateInfo={props.handleUpdateInfo}
            handleDeleteItem={props.handleDeleteItem}
          />
        ))}
      </List>
      <Backdrop className={classes.backdrop} open={props.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
