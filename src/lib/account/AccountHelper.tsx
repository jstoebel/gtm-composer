import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'
import {AccountHelperProps} from './types'
import {Box, Color} from 'ink'
import React, { Component } from 'react';

interface State {
  containers: tagmanager_v2.Schema$Container[]
  status: 'working' | 'updated' | 'unchanged'
}

class AccountHelper extends Component<AccountHelperProps, State> {
  constructor(p, s) {
    super(p, s)
    this.state = {
      containers: [],
      status: 'working'
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.render = this.render.bind(this);
  } 

  componentDidMount() {
    const {client, name, newName, accountId} = this.props
    async function fetchContainers() {
      const result = await client.accounts.containers.list({ parent: `accounts/${accountId}`})
      this.setState({containers: result.data.container})
    }

    /**
     * update account name
     */
    async function updateName() {
      if (!newName || !name || name === newName) {
        this.setState({status: 'unchanged'})
      } else {
        // name should be changed
        await client.accounts.update({requestBody: {name: newName}})
        this.setState({status: 'changed'})
      }
    }

    fetchContainers.bind(this)();
    updateName.bind(this)();
  }

  render() {
    const {newName, name, accountId} = this.props;
    const presentedName = newName || name || accountId;
    return (
      <Box>
        <Box paddingRight={1}>
          <Color green>
            {this.state.status}
          </Color>
        </Box>
        <Box>
          {presentedName}
        </Box>
        {this.props.children(this.state.containers)}
      </Box>
    )
  }
}

export default AccountHelper
