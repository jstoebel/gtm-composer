import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'
import {AccountHelperProps} from './types'
import {Box, Color} from 'ink'
import React, { Component } from 'react';

// const AccountHelper = ({children, client, accountId}: AccountHelperProps) => {

//   const [containers, setContainers] = useState<any>([])
//   // const [updateState, setUpdateState] = useState<'updating' | 'updated' | 'unchanged'>(null)

//   useEffect(() => {
//     console.log('hello from use effect');
    
//     async function fetchContainers() {
//       const result = await client.accounts.containers.list({ parent: `accounts/${accountId}`})
//       console.log('setting containers', result.data.container);
//       setContainers(result.data.container) // if you put in a hard coded value here, 
//     }

//     fetchContainers();
//   }, [])
//   // check that account has the given name, if not, update it

//   // also, fetch and expose all containers in that account
//   console.log('containers:', containers);

//   return (
//     <Box>
//       {children(containers)}
//     </Box>
//   )
// }

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
    const {client, data, name} = this.props
    async function fetchContainers() {
      const result = await client.accounts.containers.list({ parent: `accounts/${data.accountId}`})
      this.setState({containers: result.data.container})
    }

    /**
     * update account name
     */
    async function updateName() {
      if (data.name !== name) {
        // name should be changed
        await client.accounts.update({requestBody: {name}})
        this.setState({status: 'changed'})
      } else {
        // names are equal and shouldn't be changed
        this.setState({status: 'unchanged'})
      }
    }

    fetchContainers.bind(this)();
    updateName.bind(this)();
  }

  render() {
    return (
      <Box>
        <Color green>
          {this.state.status}
        </Color>
        {this.props.children(this.state.containers)}
      </Box>
    )
  }
}

export default AccountHelper
