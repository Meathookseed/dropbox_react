import React from 'react'
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input , Button} from 'reactstrap'
import {withRouter} from "react-router-dom";
import {Textarea} from 'react-inputs-validation'

class RegisterForm extends React.Component{
    constructor (props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.state = {
            token: "",
            id: "",
            email:'',
            username:'',
            password:'',
            formErorrs: {email:'',password:''}
        };
    }
    routeChange(){
        let path = '/';
        this.props.history.push(path);
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        const email = event.target.elements.email.value;
        return axios.post('http://127.0.0.1:5000/registration/',  {
            username: username,
            password: password,
            email: email,
            },
        )
            .then(res => {
                    const token = res.data.token;
                    const id = res.data.id;
                    localStorage.setItem('token', token);
                    localStorage.setItem('id',id);
                    this.setState({
                        token: token,
                        id: id
                    })
                }
            );
    };


    render() {
        return (
            <div>
                <Container className='App text-center'>
                    <h2>Registration</h2>
                    <Form  name='reg_form'  onSubmit = {event=>
                        this.handleFormSubmit(event,
                        ).then(this.routeChange)}
                    >
                        <Col>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input
                                    type = 'text'
                                    name = 'username'
                                    placeholder = 'your name'
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
                                />
                            </FormGroup>
                        </Col>
                        <Button className='mdc-button mdc-button--raised' type = 'submit'>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }

}

export default withRouter(RegisterForm);