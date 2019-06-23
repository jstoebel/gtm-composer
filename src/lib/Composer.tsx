import {Color, Text} from 'ink';
import React, {Component} from 'react';
import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'

interface Props {
  client: tagmanager_v2.Tagmanager
}

interface State {
  accounts: tagmanager_v2.Schema$Account[]
}

const AccountsContext = React.createContext([] as tagmanager_v2.Schema$Account[]);

export {AccountsContext}

export default class Composer extends Component<Props, State> {
  constructor(p, s) {
    super(p, s)
    this.state = {
      accounts: []
    }
  }

  async componentDidMount() {
    const result = await this.props.client.accounts.list()
    this.setState({
      accounts: result.data.account
    })
  }

  render() {
    return (
      <AccountsContext.Provider value={this.state.accounts}>
        {this.props.children}
      </AccountsContext.Provider>
    )
  }
}
