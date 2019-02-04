import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import IndexPage from "./containers/IndexPage";
import RegistrationPage from "./containers/RegistrationPage";
import LoginPage from "./containers/LoginPage";
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import VaultView from "./containers/VaultView";

class App extends Component {
   constructor(props){
       super(props);
       this.state = {
           isAuthorized:!!localStorage.getItem('token')
       }
   }
  render() {
      return(

          <div>
              <BrowserRouter>
                  <Switch>
                      <Route path = "/login" component = {LoginPage} exact />
                      <Route path="/register" component = {RegistrationPage} exact/>
                      <Route path='/' component={IndexPage} exact/>
                      <Route path='/vault/' component={VaultView}/>

                  </Switch>
              </BrowserRouter>
          </div>

      )
  }
}

export default App;
