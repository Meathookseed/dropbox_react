import React, { Component } from 'react'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'

export class VaultCardComponent extends Component {

  render() {
    return (
          <div key={this.props.vaults.vault_id}>
              <div  className="card shadow-sm  m-3">
                  <div className="card-body text-center align-content-center " >
                      <img  className='card-img img-thumbnail align-items-center sm-2' alt='' src="https://vignette.wikia.nocookie.net/fallout/images/7/73/Icon_vault.png/revision/latest?cb=20151206172739"/>
                      <h3 className="card-text">{this.props.vaults.title}</h3>
                      <p>{this.props.vaults.description}</p>
                      <div className="align-items-center">
                          <div className="btn-group">
                              <Link to={'/vault/'+this.props.vaults.vault_id}>
                                  <button className='btn btn-sm btn-outline-secondary'>
                                      View
                                  </button>
                              </Link>
                              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={event=>this.props.delete(event,this.props.vaults.files,this.props.vaults.vault_id)}>
                                  Delete
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    )
  }
}

VaultCardComponent.propTypes = {
    vaults: PropTypes.object
};

export default VaultCardComponent