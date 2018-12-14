import React from 'react';

import axios from 'axios';


export default class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthorized: !!localStorage.getItem('token'),
            username: "",
            password: "",
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
                const username = res.data.user.username;
                const password = res.data.user.password;
                const links = res.data.user.links.user_self_url;
                console.log(res.data.user);
                this.setState({username:username,password:password,links:links});
            })
    }
    }

    render() {
        if(this.state.isAuthorized){
        return (
            <ul>
                <li>{this.state.username}</li>
                <li>{this.state.password}</li>
                <li>{this.state.links}</li>
            </ul>
        )}
        else {
            return (
                null
            )
        }
    }
}
