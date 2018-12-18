import React, { Component } from 'react'
import Home from "../components/Home";
import NavBar from "../components/NavBar";
import LoggedIn from "../components/LoggedIn";
import VaultCard from "../components/VaultCard";
import Footer from "../components/Footer";

export class IndexPage extends Component {
    constructor(props){
        super(props);
        this.state={
            isAuthorized:localStorage.getItem('token')
        }
    }
  render() {
    if (this.state.isAuthorized){
        return (
            <div>
                <NavBar/>
                <LoggedIn/>
                <VaultCard/>
                <Footer/>
            </div>
    )}
    else{
        return(
            <div>
                <NavBar/>
                <Home/>
                <Footer/>
            </div>
        )
    }
  }
}

export default IndexPage