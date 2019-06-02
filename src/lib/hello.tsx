

import {Color} from 'ink';
import React from 'react';

export class Hello extends React.Component<{}, {running: boolean}> {

  constructor(p, s) {
    super(p, s)
    this.state = {running: true}
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({running: false})
    }, 2000);
  }

  render() {

    if (this.state.running) {
      return (
        <Color yellow>
          {"wait..."}
        </Color>
      )
    } else {
      return (
        <Color green>
          {"all done!"}
        </Color>
      )
    }
  }
}
