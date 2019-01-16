import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { getBlocksAsync } from './api'
import BlockSimple from './Components/BlockSimple'

class App extends Component {

  constructor(){
    super()
    this.state = {
      blocks: [],
    }
  }

  componentDidMount(){

    this.getBlocks()
  }

  getBlocks = () => {
    const url = 'https://blockchain.info/blocks?format=json'
    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        this.setState({ blocks: resJson.blocks})

      })
      .catch(err => {
        console.error(err);
        Promise.reject(err)
      });

  }

  blockList = () => {
    const {blocks} = this.state
    const listItem = blocks.map(item => {
      console.log(item);
      return (
        <li>
          <BlockSimple data={item} />
        </li>
      )
    })
    
    return (
      <ul>{listItem}</ul>
    )
  }


  render() {

    return (
      <div className="App">

        <div>Block Xplor</div>

          {this.blockList()}

      </div>
    );
  }
}

export default App;
