import React from 'react';

import axios from 'axios';

import {Jumbotron} from "reactstrap";


export default class LoggedIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthorized: !!localStorage.getItem('token'),
            username: "",
            password: "",
            photo:"",
            links: "",
            admin: null,
            id: localStorage.getItem('id')
        }
    }

    componentDidMount() {
        if (this.state.isAuthorized){
        axios.get(`http://127.0.0.1:5000/user/${this.state.id}`,
            {
                headers:{
                    Bearer: `${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log(res.data)
                const username = res.data.user.username;
                const password = res.data.user.password;
                const links = res.data.user.links.user_self_url;
                const photo = res.data.user.photo;
                this.setState({username:username,password:password,links:links,photo:photo});
            })
    }
    }

    render() {
        return (
            <div className='container-fluid m-0 p-0 text-center h-50'>
            <Jumbotron fluid>
                <h1 className="display-1">Hello, {this.state.username}!</h1>
                <img src={this.state.photo} alt=''/>
                <p className="lead">You at start of discovering of my new project.</p>
                <hr className="my-2"/>
            </Jumbotron>
            </div>
        )
    }
}
