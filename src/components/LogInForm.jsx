import React from 'react'
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input , Button} from 'reactstrap'
import {withRouter} from 'react-router-dom';
import {socket} from "../socket/api";




class LogInForm extends React.Component{
    constructor (props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.state = {
            isAuthorized: null,
            token: "",
            id: ""
        };
    }

    routeChange(){
        let path = '/';
        console.log(localStorage.getItem('id'));
        this.props.history.push(path);
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        return axios.post('http://0.0.0.0:5000/login/',  {
                username: username,
                password: password,
            },
        )
            .then(res => {
                    const token = res.data.token;
                    const id = res.data.id;
                    localStorage.setItem('token', token);
                    localStorage.setItem('id',id);
                    this.setState({
                        isAuthorized: true,
                        token: token,
                        id: id
                    })
                }
            )
            .then(socket.open())

    };

    render() {
            return (
                <div>
                    <Container className='App'>
                        <h2>Login</h2>
                        <Form name='login_form' onSubmit={event =>
                            this.handleFormSubmit(event,
                            ).then(this.routeChange)}
                        >
                            <Col>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <Input
                                        type='text'
                                        name='username'
                                        placeholder='your name'
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
                                    />
                                </FormGroup>
                            </Col>
                            <Button type='submit'>Submit</Button>
                        </Form>
                    </Container>
                </div>
            );

        }


}

export default withRouter(LogInForm);