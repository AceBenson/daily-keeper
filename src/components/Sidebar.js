import React from 'react'
import { NavLink } from "react-router-dom";
import { Hidden, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
// import theme from '../style';

const styles = theme => ({
  list: {

  },
  navlink: {
    textDecoration: "none",
  },
  listitem: {
    
  },
  drawer: {
    width: `${260}px`,
  }
});

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();

  const brand = (
    <h1>Daily Keeper</h1>
  );

  const links = (
    <List className={classes.list} >
      {props.routes.map((props, key) => {
        return (
          <NavLink
            to={props.path}
            key={key}
            className={classes.navlink}
          >
            <ListItem button className={classes.listitem}>
              <ListItemIcon>
                <props.icon />
              </ListItemIcon>
              <ListItemText
                primary={props.name}
              />
            </ListItem>
          </NavLink>
        )
      })}
    </List>
  );

  return (
    <div>
      <Hidden smDown className={classes.drawer}>
        <Drawer
          open
          variant="persistent"
          anchor="left"
          classes={{
            paper: classes.drawer
          }}
        >
          {brand}
          {links}
        </Drawer>
      </Hidden>
    </div>
  )
}
