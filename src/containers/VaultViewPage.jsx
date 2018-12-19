import React, { Component } from 'react';
import NavBar from "../components/NavBar";
import VaultView from "../components/VaultView";


export class VaultViewPage extends Component {

    render() {
    return (
      <div>
        <NavBar/>
        <VaultView/>
      </div>
    )
  }
}

export default VaultViewPage