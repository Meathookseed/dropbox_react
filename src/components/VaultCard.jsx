import React, { Component } from 'react'
import axios from "axios";

export class VaultCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            vaults: [],
            id:localStorage.getItem('id')
        }
    }
    componentDidMount() {
            axios.get(`http://127.0.0.1:5000/user/${this.state.id}`,
                {
                    headers: {
                        Bearer: `${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    const vaults = res.data.user.vaults;
                    this.setState({vaults:vaults});
                })
    }
  render() {
    return (

        <div className='container-fluid'>
            <div className='row'>
                {this.state.vaults.map(vaults =>(
                    <div key={vaults.vault_id} className="col-3">
                        <div  className="card mb-4 shadow-sm">
                            <div className="card-body text-center" >
                                <img  className='card-img img-thumbnail align-items-center' alt='' src="https://vignette.wikia.nocookie.net/fallout/images/7/73/Icon_vault.png/revision/latest?cb=20151206172739"/>
                                <h3 className="card-text">{vaults.title}</h3>
                                <p>{vaults.description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">View
                                        </button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit
                                        </button>
                                    </div>
                                    <small className="text-muted">9 mins</small>
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