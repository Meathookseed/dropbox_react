import React, { Component } from 'react'
import Home from "../components/Home";
import NavBar from "../components/NavBar";
import LoggedIn from "../components/LoggedIn";
import VaultCard from "../components/VaultCard";
import VaultCreate from "../components/VaultCreate";

export class IndexPage extends Component {
    constructor(props){
        super(props);
        this.state={
            isAuthorized:!!localStorage.getItem('token'),
        }
    }
  render() {
    if (this.state.isAuthorized){
        return (
            <div>
                <NavBar/>
                <LoggedIn/>
                <VaultCreate />
                <VaultCard/>
            </div>
    )}
    else{
        return(
            <div>
                <NavBar/>
                <Home text={'This is a simple dropbox like application where communication of server and client based on REST API mechanism. Using Flask on back and ReactJs on front.'} user={'new user'}/>
            </div>
        )
    }
  }
}

export default IndexPage