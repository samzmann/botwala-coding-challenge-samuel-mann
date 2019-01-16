import React, { Component } from 'react';

export default class BlockSimple extends Component {

  constructor() {
    super()
    this.state = {
      secondsAgo: null
    }
  }

  componentDidMount() {
    console.log(this.props);
    const t = Date.now()/1000
    console.log(t);
    console.log(this.props.data.time);
    this.setState({
      secondsAgo: t - this.props.data.time
    })
  }

  renderTime = () => {
    if (this.state.secondsAgo < 60) {
      return <div>Less than a minute ago</div>
    } else {
      return <div>{Math.floor(this.state.secondsAgo / 60)} minutes ago</div>
    }
  }

  renderShortHash = () => {
    const shortHash = this.props.data.hash.substring(this.props.data.hash.length - 7, this.props.data.hash.length)
    return <div>Hash: {shortHash}</div>
  }

  render(){
    return(
      <div className="block-simple-outer">
        {this.renderTime()}
        {this.renderShortHash()}
      </div>
    )
  }
}
