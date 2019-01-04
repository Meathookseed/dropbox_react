import React, { Component } from 'react'
import axios from 'axios'
import {Button,Input,Label,Form,FormGroup,Col,Container} from 'reactstrap'
import {socket, submitForm} from "../socket/api";

export class VaultCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:"",
            titleError:"",
            description:"",
            descriptionError:"",
            id:localStorage.getItem('id'),
        }
    }
    handleVaultCreate = (event) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const description = event.target.elements.description.value;
        return axios.post(`http://0.0.0.0:5000/vault/${this.state.id}`,  {
                title: title,
                description: description,
            },{headers:{
                Bearer:`${localStorage.getItem('token')}`
            }}
            )
    };

  render() {
    return (
      <div>
          <Container className='App text-center'>
              <h2>Create Vault</h2>
              <Form  name='reg_form'  onSubmit = {event=>
                  this.handleVaultCreate(event,
                  ).then(() => submitForm()).then(() => socket.emit('vault_events', {id:this.state.id}))}
              >
                  <Col>
                      <FormGroup>
                          <Label>Title</Label>
                          <Input
                              type = 'text'
                              name = 'title'
                              placeholder = 'title'
                          />
                          {<p>{this.state.titleError}</p>}
                      </FormGroup>
                  </Col>
                  <Col>
                      <FormGroup>
                          <Label>Description</Label>
                          <Input
                              type = 'text'
                              name = 'description'
                              placeholder = 'description'
                          />
                          {<p>{this.state.descriptionError}</p>}
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

export default VaultCreate