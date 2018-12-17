import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import IndexPage from "./containers/IndexPage";
import RegistrationPage from "./containers/RegistrationPage";
import LoginPage from "./containers/LoginPage";


class App extends Component {
  render() {
      return(
          <div>
              <BrowserRouter>
                  <Switch>
                      <Route path = "/login" component = {LoginPage}/>
                      <Route path="/register" component = {RegistrationPage}/>
                      <Route path='/' component={IndexPage} exact/>
                      <Route component={Error}/>
                  </Switch>
              </BrowserRouter>
          </div>
      )
  }
}

export default App;
