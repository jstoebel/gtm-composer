import React, { useState, useEffect } from 'react';
import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'
import {IAccountHelper} from './types'
import {Box, Color} from 'ink'

interface State {
  containers: tagmanager_v2.Schema$Container[]
  status: 'working' | 'updated' | 'unchanged'
}

const AccountHelper:React.FunctionComponent<IAccountHelper> = ({client}) => {

  const [state, setState] = useState<State>({
    containers: [],
    status: 'working'
  })

  function accountShouldChangeName():boolean {
    // find the account this is referencing:

    // name is the same -> return false

    // name is different -> return true

    // can't find account -> return false
    return false
  }

  useEffect(() => {
    
  }, [])
  return <div></div>
}

// class AccountHelper extends Component<IAccountHelper, State> {
//   constructor(p, s) {
//     super(p, s)
//     this.state = {
//       containers: [],
//       status: 'working'
//     }
//     this.componentDidMount = this.componentDidMount.bind(this);
//     this.render = this.render.bind(this);
//   } 

//   componentDidMount() {
//     const {client, name, newName, accountId} = this.props
//     async function fetchContainers() {
//       const result = await client.accounts.containers.list({ parent: `accounts/${accountId}`})
//       this.setState({containers: result.data.container})
//     }

//     /**
//      * update account name
//      */
//     async function updateName() {
//       if (!newName || !name || name === newName) {
//         this.setState({status: 'unchanged'})
//       } else {
//         // name should be changed
//         await client.accounts.update({requestBody: {name: newName}})
//         this.setState({status: 'changed'})
//       }
//     }

//     fetchContainers.bind(this)();
//     updateName.bind(this)();
//   }

//   render() {
//     const {newName, name, accountId} = this.props;
//     const presentedName = newName || name || accountId;
//     return (
//       <Box>
//         <Box paddingRight={1}>
//           <Color green>
//             {this.state.status}
//           </Color>
//         </Box>
//         <Box>
//           {presentedName}
//         </Box>
//         {this.props.children(this.state.containers)}
//       </Box>
//     )
//   }
// }

export default AccountHelper
