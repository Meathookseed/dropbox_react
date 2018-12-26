import React, { Component } from 'react'
import axios from "axios";
import {Jumbotron} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import FileCreate from '../components/FileCreate'
export class VaultView extends Component {

    constructor(props){
        super(props);
        this.state = {
            token:localStorage.getItem('token'),
            vault_id: document.location.href.split('/')[4],
            description: null,
            title: null,
            files:[]
        };
        this.routeChange = this.routeChange.bind(this)
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/vault/${this.state.vault_id}`, {
            headers:{
                Bearer:`${this.state.token}`
            }
        })
            .then(res => {
                console.log(res.data)
                const title = res.data.vault.title;
                const description = res.data.vault.description;
                const files = res.data.vault.files;
                this.setState({title:title,description:description,files:files})
            });
    }

    handleDelete = (event ,vault_id) =>{
        event.preventDefault();
        axios.delete(`http://127.0.0.1:5000/file/${vault_id}`, {
            headers:{
                Bearer:`${localStorage.getItem('token')}`,
            }})
            .then(this.routeChange)
    };
    routeChange(){
        let path='/created';
        this.props.history.push(path)
    }

  render() {
    return (
      <div className='container-fluid'>
          <div className='container-fluid m-0 p-0 text-center'>
              <Jumbotron fluid>
                  <h1 className="display-1">Hello, this is {this.state.title} vault!</h1>
                  <h2 className='display-4'>Description:{this.state.description}</h2>
                  <hr className="my-2"/>
                  <p className="lead">Here you could see all your file content that lies in vault</p>
              </Jumbotron>
              <FileCreate/>
          </div>
          <div className='container-fluid'>
              <div className='row'>
                  {this.state.files.map(file => (
                      <div key={file.file_id}>
                          <div  className="card shadow-sm m-3">
                              <div className="card-body text-center align-content-center " >
                                  <a href={file.data} download>
                                      <img height='64' width='64' className='card-img img-thumbnail align-items-center sm-2' alt='' src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/12.File-512.png"/>
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

export default withRouter(VaultView)