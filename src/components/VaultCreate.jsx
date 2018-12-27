import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from "react-router-dom";
import {Button,Input,Label,Form,FormGroup,Col,Container} from 'reactstrap'


export class VaultCreate extends Component {
    constructor(props){
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.state = {
            title:'',
            description:'',
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
    routeChange(){
        let path='/created';
        this.props.history.push(path)
    }

    handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        console.log(value);
        const name = e.target.name;
        console.log(name);
        this.setState({[name]:value})
    };

  render() {
    return (
      <div>
          <Container className='App text-center'>
              <h2>Create Vault</h2>
              <Form  name='reg_form'  onSubmit = {event=>
                  this.handleVaultCreate(event,
                  ).then(submitForm()).then(this.routeChange)}
              >
                  <Col>
                      <FormGroup>
                          <Label>Title</Label>
                          <Input
                              type = 'text'
                              name = 'title'
                              placeholder = 'title'
                              value = {this.state.title}
                              onChange={e=>this.handleChange(e)}
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
                              onChange={e=>this.handleChange(e)}
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
function submitForm() {
    let frm = document.getElementsByName('reg_form')[0];
    frm.reset();
    return false;
}
export default withRouter(VaultCreate)