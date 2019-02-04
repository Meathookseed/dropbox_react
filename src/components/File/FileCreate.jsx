import React, { Component } from 'react'
import axios from 'axios'
import {Button,Input,Label,Form,FormGroup,Col,Container} from 'reactstrap'
import {Bearer, localhost, submitForm} from "../../utils";
import {socket} from "../../socket/api";


export class FileCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            description:'',
            file:'',
            file_id:null,
            vault_id: document.location.href.split('/')[4],
            isDisabled:true
        }
    }

    onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]:value})
    };

    handleFileCreate = (event) => {
        event.preventDefault();
        const data = { name: this.state.name, description: this.state.description};
        return axios.post(`${localhost}/file/${this.state.vault_id}/`, data,{headers: Bearer})
        .then((res) =>{
            const file_id = res.data.file_id;
            const formData = new FormData();
            const file = document.querySelector('.file');
            formData.append("file", file.files[0]);
            axios.put(`${localhost}/data/${file_id}/`, formData, {
                headers: {
                    Bearer:`${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        })
            .then(() => submitForm('file-create-form'))
            .then(()=> socket.emit('file_events', {id:this.state.vault_id, token:localStorage.getItem('token')}))
    };
    render() {
        return (
            <div>
                <Container className='App text-center'>
                    <h2>Upload your file</h2>
                    <Form  name='file-create-form'  onSubmit = {this.handleFileCreate}>
                        <Col>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input
                                    type = 'text'
                                    name = 'name'
                                    placeholder = 'name'
                                    required
                                    onChange = {this.onChange}
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
                                    onChange = {this.onChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>File</Label>
                                <Input
                                    className='file'
                                    type = 'file'
                                    name = 'file'
                                    required
                                    onChange = {this.onChange}
                                />
                            </FormGroup>
                        </Col>
                        <Button className='mdc-button mdc-button--raised'
                                type = 'submit'>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default FileCreate
