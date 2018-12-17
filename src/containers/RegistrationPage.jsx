import React, { Component } from 'react'
import RegisterForm from "../components/RegisterForm";
import NavBar from "../components/NavBar";

export class RegistrationPage extends Component {
  render() {
    return (
      <div>
          <NavBar/>
          <RegisterForm/>
      </div>
    )
  }
}

export default RegistrationPage