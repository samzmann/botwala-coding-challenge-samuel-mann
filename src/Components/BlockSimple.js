import React, { Component } from 'react';

import { getBlockDetail } from '../api'

export default class BlockSimple extends Component {

  constructor() {
    super()
    this.state = {
      secondsAgo: null,
      showDetail: false,
      detail: null
    }
  }

  componentDidMount() {
    const t = Date.now()/1000
    this.setState({
      secondsAgo: t - this.props.data.time
    })
  }

  // renders pretty time
  renderTime = () => {
    if (this.state.secondsAgo < 60) {
      return <div>Less than a minute ago</div>
    } else if (this.state.secondsAgo < 3600){
      return <div>{Math.floor(this.state.secondsAgo / 60)} minutes ago</div>
    } else{
      return <div>{Math.floor(this.state.secondsAgo / 3600)} {Math.floor(this.state.secondsAgo / 3600) > 1 ? 'hours' : 'hour'} ago</div>
    }
  }

  // renders shortenned hash, to not break users' eyes
  renderShortHash = () => {
    const shortHash = this.props.data.hash.substring(this.props.data.hash.length - 7, this.props.data.hash.length)
    return <div>Hash: {shortHash}</div>
  }


  // shows this block's detail, trigers function to hide other blocks' details
  showDetail = () => {
    this.props.hideOtherBlockDetails(this.props.data.hash)

    getBlockDetail(this.props.data.hash, (res) => {
      if (res.success) {
        console.log(res.success);
        this.setState({ detail: res.success})
      } else {
        console.log(res.error);
      }
    })
    this.setState({ showDetail: true })
  }

  // hide this block's details
  hideDetail = () => {
    this.setState({ showDetail: false })
  }

  render(){
    return(
      <div>
        <div style={styles.basic} onClick={this.showDetail}>
          {this.renderShortHash()}
          <div style={{width: 20}}/>
          {this.renderTime()}
          <div style={{width: 20}}/>
          <div>Height: {this.props.data.height}</div>
        </div>

      {this.state.showDetail &&
        <div style={styles.detail}>
          <div style={{height: 40}}/>

          <div>Size: {this.state.detail && this.state.detail.size ? this.state.detail.size : 'loading...'}</div>
          <div style={{height: 10}}/>
          <div>Index: {this.state.detail && this.state.detail.block_index ? this.state.detail.block_index : 'loading...'}</div>
          <div style={{height: 10}}/>
          <div>Previous hash: {this.state.detail && this.state.detail.prev_block ? this.state.detail.prev_block : 'loading...'}</div>
          <div style={{height: 10}}/>

          {/*
            Yeah...
            Couldn't figure out the transactions and BTC total,
            but I happily provide a link to give the user the info he/she wants
          */}
          <a style={styles.link} href={`https://www.blockchain.com/btc/block/${this.props.data.hash}`} target="blank">👉 See Transactions 👈</a>

          <div style={{height: 40}}/>
        </div>
      }
      </div>
    )
  }
}

const styles = {
  basic: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  link: {
    color: '#333',
    alignSelf: 'center',
    textDecoration: 'none'
  }
}
