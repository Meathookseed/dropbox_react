import React, { Component } from 'react'
import NavBar from "../components/NavBar";
import AuthorizationForm from "../components/AuthorizationForm";

export class RegistrationPage extends Component {
  render() {
    return (
      <div>
          <NavBar/>
          <AuthorizationForm pathname='/register'/>
      </div>
    )
  }
}

export default RegistrationPage