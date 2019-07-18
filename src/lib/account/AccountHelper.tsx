import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'
import {AccountHelperProps} from './types'
import {Box} from 'ink'
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
}

class AccountHelper extends Component<AccountHelperProps, State> {
  constructor(p, s) {
    super(p, s)
    this.state = {
      containers: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.render = this.render.bind(this);
  } 

  componentDidMount() {
    const {client, accountId} = this.props
    async function fetchContainers() {
      const result = await client.accounts.containers.list({ parent: `accounts/${accountId}`})
      this.setState({containers: result.data.container})
    }

    fetchContainers.bind(this)();
  }

  render() {
    return (
      <Box>
        {this.props.children(this.state.containers)}
      </Box>
    )
  }
}

export default AccountHelper
