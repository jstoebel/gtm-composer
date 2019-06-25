import React, {Component} from 'react';
import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'

interface Props {
  client: tagmanager_v2.Tagmanager,
  children: (accounts) => React.ReactElement
}

interface State {
  accounts: tagmanager_v2.Schema$Account[]
}

export const ClientContext = React.createContext<tagmanager_v2.Tagmanager>(null);

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
      <ClientContext.Provider value={this.props.client}>
        {this.props.children(this.state.accounts)}
      </ClientContext.Provider>
    )
  }
}
