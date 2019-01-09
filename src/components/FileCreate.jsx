import React, { Component } from 'react'
import axios from 'axios'
import {Button,Input,Label,Form,FormGroup,Col,Container} from 'reactstrap'
import {socket,submitForm} from "../socket/api";


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
        return axios.post(`http://0.0.0.0:5000/file/${this.state.vault_id}`,  {
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
            axios.put(`http://0.0.0.0:5000/data/${localStorage.getItem('file_id')}`, formData, {
                headers: {
                    Bearer:`${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        })

    };
    handleInput = (event, name) =>{
        event.preventDefault();
        switch (name){
            case 'name':
                let filename = event.target.value;
                this.setState({name:filename});
                console.log(filename);
                break;
            case 'description':
                let description = event.target.value;
                console.log(description);
                this.setState({description:description});
                break;
            case 'file':
                let file = event.target.value;
                this.setState({file:file});
                break;
            default:
        }
        let error = (this.state.name.length >0 && this.state.description.length >0 && this.state.file.length > 0) ? this.setState({isDisabled:false}) : null;
        console.log(error)
        if (error ===null){
            this.setState({isDisabled:true})
        }
    };

    render() {
        return (
            <div>
                <Container className='App text-center'>
                    <h2>Upload your file</h2>
                    <Form  name='reg_form'  onSubmit = {
                        event=> this.handleFileCreate(event)
                            .then(()=> socket.emit('file_events', {id:this.state.vault_id, file_id:localStorage.getItem('file_id')}))
                            .then(() => submitForm())}
                    >
                        <Col>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input
                                    type = 'text'
                                    name = 'name'
                                    placeholder = 'name'
                                    onChange={event => this.handleInput(event,'name')}
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
                                    onChange={event => this.handleInput(event,'description')}
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
                                    onChange={event => this.handleInput(event, 'file')}
                                />
                            </FormGroup>
                        </Col>
                        <Button className='mdc-button mdc-button--raised'
                                type = 'submit'
                                disabled={this.state.isDisabled}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default FileCreate
