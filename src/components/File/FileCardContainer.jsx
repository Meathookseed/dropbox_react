import React, { Component } from 'react'
import axios from "axios";
import {socket} from "../../socket/api";
import {Bearer, localhost} from "../../utils";
import FileCardComponent from "./FileCardComponent";

export class FileCardContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            token:localStorage.getItem('token'),
            vault_id: document.location.href.split('/')[4],
            description: "",
            title: "",
            files:[]
        };
    }

    componentDidMount() {
        axios.get(`${localhost}/vault/${this.state.vault_id}/`, {headers: Bearer})
            .then(res => {
                const { vault: { title, description, files }}  = res.data;
                this.setState({title, description, files})
            })
        .then(()=>socket.on('file_state', this.onChange))
    };

    onChange = (data) => {
        const files = data.files;
        this.setState({files:files})
    };

    handleDelete = (event ,vault_id) =>{
        event.preventDefault();
        axios.delete(`http://0.0.0.0:5000/file/${vault_id}/`, {headers:Bearer})
            .then(() => socket.emit('file_events', {id:this.state.vault_id, token:localStorage.getItem('token')}))

    };

  render() {
    return (
        <div className='container-fluid'>
            <div className='container-fluid'>
                <div className='row'>
                    {this.state.files.map(file => (<FileCardComponent key={file.file_id} file={file}
                                                                      delete={this.handleDelete}
                                                                      vault_id={this.state.vault_id}/>))}
                </div>
            </div>
        </div>
    )
  }
}

export default FileCardContainer