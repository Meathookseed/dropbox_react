import React from 'react'
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input , Button} from 'reactstrap'
import Navigation from '../components/Navigation'

class RegisterForm extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            isAuthorized: false,
            token: "",
            id: ""
        };
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
                    <h2>Registration</h2>
                    <Form name='reg_form'  onSubmit = {event=>
                        this.handleFormSubmit(event,
                        ).then(submitForm)}
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
                        <Button type = 'submit'>Submit</Button>
                    </Form>
                </Container>
            </div>
        );
    }

}

function submitForm() {
    let frm = document.getElementsByName('reg_form')[0];
    frm.reset();
    return false;
}
export default RegisterForm;