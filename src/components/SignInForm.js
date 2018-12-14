import React from 'react'
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input , Button} from 'reactstrap'
import Logout from './Logout'
import {Redirect} from "react-router-dom";
import Navigation from '../components/Navigation'

class SignInForm extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            isAuthorized: null,
            token: "",
            id: ""
        };
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        return axios.post('http://127.0.0.1:5000/login/',  {
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
            );
    };

    render() {
            return (
                <div>
                    <Navigation/>
                    <Container className='App'>
                        <h2>Login</h2>
                        <Form name='login_form' onSubmit={event =>
                            this.handleFormSubmit(event,
                            ).then(submitForm).then(<Redirect to='/'/>)}
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
                    <Logout/>
                </div>
            );

        }


}

function submitForm() {
    let frm = document.getElementsByName('login_form')[0];
    frm.reset();
    return false;
}
export default SignInForm;