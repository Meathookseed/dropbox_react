import React, {Component} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

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
                    <div key={vaults.vault_id}>
                        <div  className="card shadow-sm  m-3">
                            <div className="card-body text-center align-content-center " >
                                <img  className='card-img img-thumbnail align-items-center sm-2' alt='' src="https://vignette.wikia.nocookie.net/fallout/images/7/73/Icon_vault.png/revision/latest?cb=20151206172739"/>
                                <h3 className="card-text">{vaults.title}</h3>
                                <p>{vaults.description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                            <Link to={'/vault/'+vaults.vault_id}>
                                                <button className='btn btn-sm btn-outline-secondary'>
                                                    View
                                                </button>
                                            </Link>
                                        <Link to={'/vault/edit'+vaults.vault_id}>
                                            <button type="button" className="btn btn-sm btn-outline-secondary">
                                                Edit
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
  )
  }
}

export default VaultCard