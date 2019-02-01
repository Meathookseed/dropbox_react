import React, {Component} from 'react'
import axios from "axios";
import {socket} from "../../socket/api";
import VaultCardComponent from "./VaultCardComponent";
import {localhost, Bearer} from "../../utils";


export class VaultCardContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            vaults: [],
            id:localStorage.getItem('id')
        };
    }

    componentDidMount() {
        axios.get(`${localhost}/user/${this.state.id}/`, {headers: Bearer})
            .then(res => {
                const vaults = res.data.user.vaults;
                this.setState({vaults});
            })
            .then(()=>socket.on('vault_state',this.onChange))
    };

    onChange = (data) => {
            const vaults = data.vaults;
            this.setState({vaults:vaults});
    };

    handleDelete = (event, files, vault_id) => {
        event.preventDefault();
        files.map( files => axios.delete(`${localhost}/file/${files.file_id}/`, { headers:Bearer}));
        axios.delete(`${localhost}/vault/${vault_id}/`, {headers: Bearer})
            .then(()=>socket.emit('vault_events', {id:this.state.id, token:localStorage.getItem('token')}))
    };

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    {this.state.vaults.map(vaults =>( <VaultCardComponent key={vaults.vault_id} vaults={vaults} delete={this.handleDelete}/>))}
                </div>
            </div>
        )
    }
}

export default VaultCardContainer