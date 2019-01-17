import React, { Component } from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import {socket} from "../socket/api";

export class FileCard extends Component {

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
        axios.get(`http://0.0.0.0:5000/vault/${this.state.vault_id}/`, {
            headers:{
                Bearer:`${this.state.token}`
            }
        })
            .then(res => {
                const title = res.data.vault.title;
                const description = res.data.vault.description;
                const files = res.data.vault.files;
                this.setState({title:title, description:description, files:files})
            });
        socket.on('file_state', this.onChange)
    };

    onChange = (data) => {
        console.log(data);
        const files = data.files;
        this.setState({files:files}, () => console.log('changed'))
    };
    handleDelete = (event ,vault_id) =>{
        event.preventDefault();
        axios.delete(`http://0.0.0.0:5000/file/${vault_id}/`, {
            headers:{
                Bearer:`${localStorage.getItem('token')}`,
            }})
            .then(() => socket.emit('file_events', {id:this.state.vault_id, token:localStorage.getItem('token')}))

    };

  render() {
    return (
        <div className='container-fluid'>
            <div className='container-fluid'>
                <div className='row'>
                    {this.state.files.map(file => (
                        <div key={file.file_id}>
                            <div  className="card shadow-sm m-3">
                                <div className="card-body text-center align-content-center " >
                                    <a href={file.data} download>
                                        <img height='64' width='64' className='card-img img-thumbnail align-items-center sm-2' alt='' src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/12.File-128.png"/>
                                    </a>
                                    <h3 className="card-text">{file.name}</h3>
                                    <p>{file.description}</p>
                                    <div className="align-items-center">
                                        <div className="btn-group">
                                            <Link to={`/vault/${this.state.vault_id}`}>
                                                <button type="button" className="btn btn-sm btn-outline-secondary"
                                                        onClick={event => this.handleDelete(event,file.file_id)}>
                                                    Delete
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
  }
}

export default FileCard