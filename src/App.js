import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { getBlocks, getBlockDetail } from './api'
import BlockSimple from './Components/BlockSimple'

class App extends Component {

  constructor(){
    super()
    this.state = {
      blocks: [],
    }
  }

  componentDidMount(){

    getBlocks(res => {
      if (res.success) {
        this.setState({ blocks: res.success.blocks})
      } else {
        console.log(res.error);
      }
    })
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
