import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import IndexPage from "./containers/IndexPage";
import RegistrationPage from "./containers/RegistrationPage";
import LoginPage from "./containers/LoginPage";
import VaultViewPage from "./containers/VaultViewPage";
import RedirVault from "./components/RedirVault"
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
      return(
          <MuiThemeProvider>
          <div>
              <BrowserRouter>
                  <Switch>
                      <Route path='/created' component = {RedirVault} exact />
                      <Route path = "/login" component = {LoginPage} exact />
                      <Route path="/register" component = {RegistrationPage} exact/>
                      <Route path='/' component={IndexPage} exact/>
                      <Route path='/vault/' component={VaultViewPage}/>
                  </Switch>
              </BrowserRouter>
          </div>
          </MuiThemeProvider>
      )
  }
}

export default App;
