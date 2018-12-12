import React, { Component } from 'react';
import './App.css';


import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

class App extends Component {
  render() {
      return(
          <div>
              <RegisterForm/>
              <LoginForm/>
          </div>
      )
  }
}

export default App;
