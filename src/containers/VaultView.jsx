import React, { Component } from 'react'
import NavBar from "../components/NavBar";
import Home from "../components/Home";
import FileCreate from "../components/File/FileCreate";
import FileCardContainer from "../components/File/FileCardContainer";

export class VaultView extends Component {
  render() {
    return (
      <div>
          <NavBar/>
          <Home text1 = 'This is your vault' text2 = 'This is your new vault'/>
          <FileCreate/>
          <FileCardContainer/>
      </div>
    )
  }
}

export default VaultView