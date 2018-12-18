import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import IndexPage from "./containers/IndexPage";
import RegistrationPage from "./containers/RegistrationPage";
import LoginPage from "./containers/LoginPage";
import VaultViewPage from "./containers/VaultViewPage";


class App extends Component {
  render() {
      return(
          <div>
              <BrowserRouter>
                  <Switch>
                      <Route path = "/login" component = {LoginPage} exact />
                      <Route path="/register" component = {RegistrationPage} exact/>
                      <Route path='/' component={IndexPage} exact/>
                      <Route path='/vault/' component={VaultViewPage}/>
                      <Route component={Error}/>
                  </Switch>
              </BrowserRouter>
          </div>
      )
  }
}

export default App;
