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

  handleGetBlockDetail = (hash) => {
    console.log('getting detail...');
    getBlockDetail(hash, (res) => {
      if (res.success) {
        console.log(res.success);
      } else {
        console.log(res.error);
      }
    })
  }

  blockList = () => {
    const {blocks} = this.state
    const listItem = blocks.map(item => {
      return (
        <li key={item.hash}>
          <BlockSimple data={item} getBlockDetail={this.handleGetBlockDetail}/>
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
