import React, { Component } from 'react'
import Home from "../components/Home";
import NavBar from "../components/NavBar";
import VaultCard from "../components/VaultCard";
import VaultCreate from "../components/VaultCreate";
import axios from "axios";


export class IndexPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthorized: !!localStorage.getItem('token'),
            username: "",
            password: "",
            photo:"",
            admin: null,
            id: localStorage.getItem('id')
        }
    }

    componentDidMount() {
        if (this.state.isAuthorized){
            axios.get(`http://0.0.0.0:5000/user/${this.state.id}/`,
                {
                    headers:{
                        Bearer: `${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    const username = res.data.user.username;
                    const password = res.data.user.password;
                    const photo = res.data.user.photo;
                    this.setState({username:username,password:password,photo:photo});
                })
        }
    }
  render() {
    if (this.state.isAuthorized){
        return (
            <div>
                <NavBar/>
                <Home username={this.state.username}/>
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