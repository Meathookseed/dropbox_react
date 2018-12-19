import React, { Component } from 'react'
import {Redirect} from "react-router-dom";

export class RedirFile extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: document.location.href.split('/')[3]+'/'+document.location.href.split('/')[4]
        }
    }
  render() {
    return (
      <div>
          <Redirect to='/'/>
      </div>
    )
  }
}

export default RedirFile