import React, { Component } from 'react'
import NavBar from "../components/NavBar";
import AuthorizationForm from "../components/AuthorizationForm";

export class LoginPage extends Component {
  render() {
    return (
      <div>
          <NavBar/>
          <AuthorizationForm pathname='/login'/>
      </div>
    )
  }
}

export default LoginPage