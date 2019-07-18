import React, {Component} from 'react'
import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'
import {clientContext} from './clientContext'

interface Props {
  client: tagmanager_v2.Tagmanager,
  children: (accounts) => React.ReactElement
}

interface State {
  accounts: tagmanager_v2.Schema$Account[]
}

export class Composer extends Component<Props, State> {
  constructor(p, s) {
    super(p, s)
    this.state = {
      accounts: []
    }
  }

  componentDidMount() {
    async function fetchAccounts() {
      const result = await this.props.client.accounts.list()
      this.setState({accounts:result.data.account})
    }
    fetchAccounts();
  }

  render() {
    const {client, children} = this.props
    return (
      <clientContext.Provider value={this.props.client}>
        {children(this.state.accounts)}
      </clientContext.Provider>
    )
  }
}