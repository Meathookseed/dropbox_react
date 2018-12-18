import React, { Component } from 'react'
import NavBar from "../components/NavBar";
import SignInForm from "../components/LogInForm";
import Footer from "../components/Footer";

export class LoginPage extends Component {
  render() {
    return (
      <div>
          <NavBar/>
          <SignInForm/>
          <Footer/>
      </div>
    )
  }
}

export default LoginPage