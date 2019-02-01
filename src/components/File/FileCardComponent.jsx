import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class FileCardComponent extends Component {
  render() {
    return (
          <div key={this.props.file.file_id}>
              <div  className="card shadow-sm m-3">
                  <div className="card-body text-center align-content-center " >
                      <a href={this.props.file.data} download>
                          <img height='64' width='64' className='card-img img-thumbnail align-items-center sm-2' alt='' src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/12.File-128.png"/>
                      </a>
                      <h3 className="card-text">{this.props.file.name}</h3>
                      <p>{this.props.file.description}</p>
                      <div className="align-items-center">
                          <div className="btn-group">
                                  <button type="button" className="btn btn-sm btn-outline-secondary"
                                          onClick={event => this.props.delete(event ,this.props.file.file_id)}>
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
FileCardComponent.propTypes = {
    delete:PropTypes.func,
    file:PropTypes.object,
    vault_id:PropTypes.string
};

export default FileCardComponent