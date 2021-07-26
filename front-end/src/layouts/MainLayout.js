import React from 'react'

import { makeStyles, CssBaseline, Toolbar } from '@material-ui/core';
import { Switch, Route, Redirect } from "react-router-dom";

import Sidebar from '../components/Sidebar.js'
import Navbar from '../components/Navbar'
import routes from "../routes"

const styles = theme => ({
  wrapper: {
    height: "100vh",
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
  const [open, setOpen] = React.useState(true);
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <Navbar handleDrawerOpen={handleDrawerOpen} />
      <Sidebar routes={routes} open={open} />
      <div className={classes.content}>
        <Toolbar /> {/* Use Toolbar as margin control */}
        {/* <p>{data? data : "Daily keeper from Client"}</p> */}
        {switchRoutes}
      </div>
    </div>
  )
}
