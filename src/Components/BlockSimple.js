import React, { Component } from 'react';

export default class BlockSimple extends Component {

  componentDidMount() {
    console.log(this.props);
  }

  render(){
    return(
      <div className="block-simple-outer">
        <div>Time: {this.props.data.time}</div>
      </div>
    )
  }
}
