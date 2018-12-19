import React, { Component } from 'react'
import {Redirect} from "react-router-dom";

export class RedirVault extends Component {
  render() {
    return (
        <div>
            <Redirect to='/'/>
        </div>
    )
  }
}

export default RedirVault