import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from "react-router-dom";
import {Form,Container} from 'reactstrap'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export class VaultCreate extends Component {
    constructor(props){
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.state = {
            title:"",
            titleError:"",
            description:"",
            descriptionError:"",
            id:localStorage.getItem('id'),
            titleValid:false
        }
    }

    handleVaultCreate = (event) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const description = event.target.elements.description.value;
        return axios.post(`http://127.0.0.1:5000/vault/${this.state.id}`,  {
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

    change = e => {
        this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    validate = () => {
        let isError = false;
        const errors = {
            titleError: "",
            descriptionError: "",
        };

        if (this.state.title.length < 4) {
            isError = true;
            errors.titleError = "Title needs to be at least 4 characters long";
        }

        if (this.state.description.length < 10) {
            isError = true;
            errors.descriptionError = "Requires valid description";
        }

        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };
    onSubmit = e => {
        e.preventDefault();
        // this.props.onSubmit(this.state);
        const err =this.validate();
        if (!err){
        this.setState({
            title:"",
            titleError:"",
            description:"",
            descriptionError:""
        });
        this.props.onChange({
            title:"",
            description:"",
        })};
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
                  <TextField
                      name="title"
                      hintText="title"
                      floatingLabelText="title"
                      value={this.state.title}
                      onChange={e => this.change(e)}
                      errorText={this.state.titleError}
                  />
                  <br />
                  <TextField
                      name="description"
                      hintText="description"
                      floatingLabelText="Description"
                      value={this.state.description}
                      onChange={e => this.change(e)}
                      errorText={this.state.descriptionError}
                  />
                  <br />
                  <RaisedButton label="Submit" primary onClick={e=>this.onSubmit(e)} />
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