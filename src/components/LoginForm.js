import React from 'react';
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input , Button} from 'reactstrap'
class LoginForm extends React.Component {

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        const email = event.target.elements.email.value;

        return axios.post('http://127.0.0.1:5000/user',{
            username: username,
            password: password,
            email: email
        });
    };



    render() {
        return (
                <div>
                    <Container className='App'>
                        <h2>REST</h2>
                        <Form name='rest' onSubmit = {event=>
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
    var frm = document.getElementsByName('rest')[0];
    frm.reset();
    return false;
}
export default LoginForm;