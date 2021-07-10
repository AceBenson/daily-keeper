import React from 'react'
import clsx from 'clsx';
import { NavLink } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar } from '@material-ui/core';

const drawerWidth = 220;

const styles = theme => ({
  navlink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  drawer: {
    flexShrink: 0,
    width: `${drawerWidth}px`,
  },
  drawerOpen: {
    width: `${drawerWidth}px`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
});

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();

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
      <Drawer
        open
        variant="permanent"
        anchor="left"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          }),
        }}
      >
        <Toolbar />
        {links}
      </Drawer>
    </div>
  )
}
