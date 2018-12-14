import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import RegisterForm from "./components/RegisterForm";
import SignInForm from  "./components/SignInForm"
import Home from "./components/Home";
import Navigation from "./components/Navigation";

class App extends Component {
  render() {
      return(
          <div>
              <BrowserRouter>
                  <Switch>
                      <Route path = "/login" component = {SignInForm}/>
                      <Route path="/register" component = {RegisterForm}/>
                      <Route path='/' component={Home} exact/>
                      <Route component={Error}/>
                  </Switch>
              </BrowserRouter>
          </div>
      )
  }
}

export default App;
