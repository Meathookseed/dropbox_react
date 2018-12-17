import React, { Component } from 'react'
import NavBar from "../components/NavBar";
import SignInForm from "../components/LogInForm";

export class LoginPage extends Component {
  render() {
    return (
      <div>
          <NavBar/>
          <SignInForm/>
      </div>
    )
  }
}

export default LoginPage