import React, { Component } from 'react'
import axios from 'axios'
import {
    Button,
    Input,
    Label,
    Form,
    FormGroup,
    Col,
    Container} from 'reactstrap'
import {socket} from "../../socket/api";
import {submitForm, localhost, Bearer} from "../../utils";

export class VaultCreateForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            title:'',
            description:'',
            id:localStorage.getItem('id'),
            isDisabled:true
        }
    }
    onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]:value})
    };

    handleVaultCreate = (event) => {
        event.preventDefault();
        submitForm('vault-create-form');
        const data = {title:this.state.title, description:this.state.description};
        return axios.post(`${localhost}/vault/${this.state.id}/`, data,{headers:Bearer})
            .then(() => this.setState({isDisabled:true}))
            .then(()=>socket.emit('vault_events', {id:this.state.id, token:localStorage.getItem('token')}))};

    render() {
        return (
            <div>
                <Container className='App text-center'>
                    <h2>Create Vault</h2>
                    <Form  name='vault-create-form' onSubmit={this.handleVaultCreate}>
                        <Col>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input
                                    type = 'text'
                                    name = 'title'
                                    placeholder = 'title'
                                    required
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input
                                    type = 'text'
                                    name = 'description'
                                    placeholder = 'description'
                                    required
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                        </Col>
                        <Button className='mdc-button mdc-button--raised' type = 'submit' >
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default VaultCreateForm