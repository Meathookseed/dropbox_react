import React, { Component } from 'react'
import RegisterForm from "../components/RegisterForm";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export class RegistrationPage extends Component {
  render() {
    return (
      <div>
          <NavBar/>
          <RegisterForm/>
          <Footer/>
      </div>
    )
  }
}

export default RegistrationPage