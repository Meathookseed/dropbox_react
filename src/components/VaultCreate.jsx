import React, { Component } from 'react'
import axios from 'axios'
import {Button,Input,Label,Form,FormGroup,Col,Container} from 'reactstrap'
import {socket, submitForm} from "../socket/api";

export class VaultCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:"",
            description:"",
            id:localStorage.getItem('id'),
            isDisabled:true
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

    handleInput = (event, name) =>{
        event.preventDefault();
        switch (name){
            case 'description':
                let description = event.target.value;
                console.log(description);
                this.setState({description:description});
                break;
            case 'title':
                let title = event.target.value;
                console.log(title.length);
                this.setState({title:title});
                break;
            default:
        }
       let error = (this.state.title.length >0 && this.state.description.length >0) ? this.setState({isDisabled:false}) : null;
        if (error ===null){
            this.setState({isDisabled:true})
        }
    };


  render() {
    return (
      <div>
          <Container className='App text-center'>
              <h2>Create Vault</h2>
              <Form  name='reg_form'  onSubmit = {event=>
                  this.handleVaultCreate(event,
                  ).then(() => submitForm()).then(() => socket.emit('vault_events', {id:this.state.id})).then(() => this.setState({isDisabled:true}))}
              >
                  <Col>
                      <FormGroup>
                          <Label>Title</Label>
                          <Input
                              type = 'text'
                              name = 'title'
                              placeholder = 'title'
                              onChange = {event => this.handleInput(event,"title")}
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
                              onChange = {event => this.handleInput(event, 'description')}
                          />
                      </FormGroup>
                  </Col>
                  <Button className='mdc-button mdc-button--raised' type = 'submit' disabled={this.state.isDisabled}>
                      Submit
                  </Button>
              </Form>
          </Container>
      </div>
    )
  }
}

export default VaultCreate