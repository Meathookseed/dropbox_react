import React, { Component } from 'react'
import axios from 'axios'
import {Button,Input,Label,Form,FormGroup,Col,Container} from 'reactstrap'
import {submitForm} from "../socket/api";
import {socket} from "../socket/api";


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

    handleFileCreate = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const description = event.target.elements.description.value;
        return axios.post(`http://0.0.0.0:5000/file/${this.state.vault_id}/`,  {
                name: name,
                description: description,
            },{headers:{
                    Bearer:`${localStorage.getItem('token')}`
                }},
        ).then(res => {
            const file_id = res.data.file_id;
            localStorage.setItem('file_id',file_id);
        }).then(() =>{
            const formData = new FormData();
            const file = document.querySelector('.file');
            formData.append("file", file.files[0]);
            axios.put(`http://0.0.0.0:5000/data/${localStorage.getItem('file_id')}/`, formData, {
                headers: {
                    Bearer:`${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        })
    };
    render() {
        return (
            <div>
                <Container className='App text-center'>
                    <h2>Upload your file</h2>
                    <Form  name='reg_form'  onSubmit = {
                        event=> this.handleFileCreate(event).then(() => submitForm())
                            .then(()=> socket.emit('file_events', {id:this.state.vault_id, token:localStorage.getItem('token')}))}
                    >
                        <Col>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input
                                    type = 'text'
                                    name = 'name'
                                    placeholder = 'name'
                                    required
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
