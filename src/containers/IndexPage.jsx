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
            isAuthorized:localStorage.getItem('token'),
            fields:{}
        }
    }
    onChange = updatedValue => {
        this.setState({
            fields: {
                ...this.state.fields,
                ...updatedValue
            }
        });
    };
  render() {
    if (this.state.isAuthorized){
        return (
            <div>
                <NavBar/>
                <LoggedIn/>
                <VaultCreate onChange={fields => this.onChange(fields)} />
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