import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MainLayout from "./layouts/MainLayout"

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

ReactDOM.render(
  <ThemeProvider  theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainLayout} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider >,
  document.getElementById('root')
);