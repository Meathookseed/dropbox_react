import React, { Component } from 'react'
import {Button, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import axios from 'axios'
import {withRouter} from "react-router-dom";
import {localhost, submitForm} from "../utils";
import {socket} from "../socket/api";

export class AuthorizationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            email:'',
        }
    }

    handleFormSubmit = (event, pathname) => {
        event.preventDefault();
        switch (pathname){
            case '/login':
                submitForm('login-form');
                return axios.post( `${localhost}/login/`, {
                    username:this.state.username, password:this.state.password
                })
                    .then( res =>{
                        const {token, id} = res.data;
                        localStorage.setItem('token', token);
                        localStorage.setItem('id',id);
                    })
                    .then(this.routeChange)
                    .then(socket.open());

            case '/register':
                submitForm('reg-form');
                return axios.post(`${localhost}/registration/`, {
                    username:this.state.username,password:this.state.password,email:this.state.email
                })
                    .then( res =>{
                        const {token, id} = res.data;
                        localStorage.setItem('token', token);
                        localStorage.setItem('id',id);
                    })
                    .then(this.routeChange)
                    .then(socket.open());
            default:
                return null
        }
    };

    routeChange = ()=>{
        let path = '/';
        this.props.history.push(path);
    };

    onChange = (event) => {
      const value = event.target.value;
      const name = event.target.name;
      this.setState({[name]:value})
    };

    render() {
        if (this.props.pathname==='/login')
        {
            return (
                <div>
                    <Container className='App'>
                        <h2>Login</h2>
                        <Form name='login-form' onSubmit={event=>this.handleFormSubmit(event,'/login')}>
                            <Col>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <Input
                                        type='text'
                                        name='username'
                                        placeholder='your name'
                                        onChange = {this.onChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                        type='password'
                                        name='password'
                                        placeholder='your password'
                                        onChange = {this.onChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Button type='submit'>Submit</Button>
                        </Form>
                    </Container>
                </div>
            )
        }
        else if (this.props.pathname==='/register'){
            return (
                <div>
                    <Container className='App text-center'>
                        <h2>Registration</h2>
                        <Form  name='reg-form' onSubmit = {event => this.handleFormSubmit(event, '/register')}>
                            <Col>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <Input
                                        type = 'text'
                                        name = 'username'
                                        placeholder = 'your name'
                                        onChange = {this.onChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                        type = 'password'
                                        name = 'password'
                                        placeholder = 'your password'
                                        onChange = {this.onChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        type = 'email'
                                        name = 'email'
                                        placeholder = 'your email'
                                        onChange = {this.onChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Button className='mdc-button mdc-button--raised' type = 'submit'>
                                Submit
                            </Button>
                        </Form>
                    </Container>
                </div>
            )
        }
    }

}

export default withRouter(AuthorizationForm);