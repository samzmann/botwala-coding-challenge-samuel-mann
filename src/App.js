import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { getBlocks } from './api'

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

  // Hide other blocks' details when user clicks to view detail
  hideOtherBlockDetails = (hash) => {
    const blocks = this.state.blocks.filter(el => {return el.hash != hash})
    blocks.forEach(item => {
      this.BlocksRef[`BLOCKS_${item.hash}`].hideDetail()
    })
  }

  // renders the list of blocks
  blockList = () => {
    const {blocks} = this.state
    const listItem = blocks.map(item => {
      return (
        <div key={item.hash}>
          <BlockSimple
            ref={(ref) => this.BlocksRef = {...this.BlocksRef, [`BLOCKS_${item.hash}`]: ref}}
            data={item}
            hideOtherBlockDetails={this.hideOtherBlockDetails}
            />
            <div style={{height: 1, background: 'lightgrey', margin: 10}} />
        </div>
      )
    })

    return (
      <div style={styles.list}>{listItem}</div>
    )
  }

  render() {

    return (
      <div className="App" style={styles.container}>

        <div style={styles.inner}>

          <div style={{height: 20}} />

          <div style={styles.title}>Block Xplor</div>

          <div style={{height: 40}} />

          {this.blockList()}

          <button onClick={() => {console.log('this button does nothing 😓')}}>Load more</button>

        </div>

      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#f8f8f8',
    color: '#333',
  },
  inner: {
    alignSelf: 'center',
    width: 750
  },
  title: {
    fontSize: 30,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between'
  }
}

export default App;
