import React, {Component} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import {socket} from "../socket/api";

export class VaultCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            vaults: [],
            id:localStorage.getItem('id')
        };
    }

    componentDidMount() {
        axios.get(`http://0.0.0.0:5000/user/${this.state.id}`,
            {
                headers: {
                    Bearer: `${localStorage.getItem('token')}`
                },
            })
            .then(res => {
                const vaults = res.data.user.vaults;
                this.setState({vaults:vaults}, () => console.log('first state'));
            });
        socket.on('vault_state', this.onChange);
    }
    onChange = (data) => {
            const vaults = data.vaults;
            this.setState({vaults:vaults}, () => console.log('state changed'));
    };


    handleDelete = (event, files, vault_id) => {
        event.preventDefault();
        files.map( files => (
            axios.delete(`http://0.0.0.0:5000/file/${files.file_id}`, {
                headers:{
                    Bearer:`${localStorage.getItem('token')}`,
                }})));
        axios.delete(`http://0.0.0.0:5000/vault/${vault_id}`, {
            headers:{
                Bearer:`${localStorage.getItem('token')}`,
            }})
            .then(() => socket.emit('vault_events', {id:this.state.id}))
    };

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    {this.state.vaults.map(vaults =>(
                        <div key={vaults.vault_id}>
                            <div  className="card shadow-sm  m-3">
                                <div className="card-body text-center align-content-center " >
                                    <img  className='card-img img-thumbnail align-items-center sm-2' alt='' src="https://vignette.wikia.nocookie.net/fallout/images/7/73/Icon_vault.png/revision/latest?cb=20151206172739"/>
                                    <h3 className="card-text">{vaults.title}</h3>
                                    <p>{vaults.description}</p>
                                    <div className="align-items-center">
                                        <div className="btn-group">
                                            <Link to={'/vault/'+vaults.vault_id}>
                                                <button className='btn btn-sm btn-outline-secondary'>
                                                    View
                                                </button>
                                            </Link>
                                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={event =>
                                                    this.handleDelete(event,vaults.files,vaults.vault_id)}>
                                                    Delete
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default VaultCard