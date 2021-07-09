import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MainLayout from "./layouts/MainLayout"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={MainLayout} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);