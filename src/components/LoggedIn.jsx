import React from 'react';

import axios from 'axios';

import Home from "./Home";

export default class LoggedIn extends React.Component {
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
        return (
           <Home username = {this.state.username}/>
        )
    }
}
