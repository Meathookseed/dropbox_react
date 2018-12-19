import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from "react-router-dom";
import {Button,Input,Label,Form,FormGroup,Col,Container} from 'reactstrap'

export class VaultCreate extends Component {
    constructor(props){
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.state = {
            name:'',
            description:'',
            file_id:null,
            vault_id: document.location.href.split('/')[4],
        }
    }

    handleFileCreate = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const description = event.target.elements.description.value;
        return axios.post(`http://127.0.0.1:5000/file/${this.state.vault_id}`,  {
                name: name,
                description: description,
            },{headers:{
                    Bearer:`${localStorage.getItem('token')}`
                }},
        ).then(res => {
            const file_id = res.data.file_id;
            localStorage.setItem('file_id',file_id);
        }).then(response=>{
            const formData = new FormData();
            const file = document.querySelector('.file');
            formData.append("file", file.files[0]);
            axios.put(`http://127.0.0.1:5000/data/${localStorage.getItem('file_id')}`, formData, {
                headers: {
                    Bearer:`${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        })
    };

    routeChange(){
        let path='/file';
        this.props.history.push(path)
    }

    render() {
        return (
            <div>
                <Container className='App text-center'>
                    <h2>Upload your file</h2>
                    <Form  name='reg_form'  onSubmit = {event=>
                        this.handleFileCreate(event
                        ).then(this.routeChange)}
                    >
                        <Col>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input
                                    type = 'text'
                                    name = 'name'
                                    placeholder = 'name'
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

export default withRouter(VaultCreate)