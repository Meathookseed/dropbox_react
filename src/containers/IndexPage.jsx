import React, { Component } from 'react'
import Home from "../components/Home";
import NavBar from "../components/NavBar";
import LoggedIn from "../components/LoggedIn";
import VaultCard from "../components/VaultCard";

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
            </div>
    )}
    else{
        return(
            <div>
                <NavBar/>
                <Home/>
            </div>
        )
    }
  }
}

export default IndexPage