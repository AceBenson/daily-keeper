import React from 'react'

import { makeStyles } from '@material-ui/core';
import { Switch, Route, Redirect } from "react-router-dom";

import Sidebar from '../components/Sidebar.js'
import Navbar from '../components/Navbar'
import routes from "../routes"

const styles = theme => ({
  wrapper: {
    height: "100vh",
  },
  mainPanel: {
    width: `calc(100% - ${260}px)`,
    float: "right",
    border: "solid 1px",
  },
  content: {
    padding: "30px 15px",
    marginTop: `${70}px`,
  }
});

const useStyles = makeStyles(styles);


const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          component={prop.component}
          key={key}
        />
      );
    })}
    <Redirect from="/" to="/tracker" />
  </Switch>
);

export default function MainLayout() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
      />
      <div className={classes.mainPanel}>
        <Navbar />
        <div className={classes.content}>{switchRoutes}</div>
        <h1>MainPanel</h1>
      </div>
    </div>
  )
}
