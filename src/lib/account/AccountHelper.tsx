import React, { useState, useEffect } from 'react';
import {IAccountHelper, IAccountData} from './types'
// import {Box, Color} from 'ink'

const AccountHelper:React.FunctionComponent<IAccountHelper> = ({client, allAccounts, name, accountId, updateAccountName}) => {

  const [changeNameState, setChangeNameState] = useState<'working' | 'updated' | 'unchanged' | 'not found'>()
  console.log(changeNameState);
  
  /**
   * attempts to find an account by ID
   * @param accountId - an accountId to search for in known accounts
   * @returns found account or nothing if not found
   */
  const findAccountById = (): IAccountData | undefined => allAccounts.find((accountFromList) => accountFromList.accountId === accountId)

  const findAccountByName = (): IAccountData | undefined => allAccounts.find((accountFromList) => accountFromList.name === name)
  /**
   * Find the matching account from the store if it exists. 
   * Search by both accoundtId and name.
   * Store result in `containersAndState
   * If the name is provided, the first match is used.
   */
  function findExistingAccount(): IAccountData | undefined {
    return findAccountById() || findAccountByName()
  }

  /**
   * Determines if the account needs to change its name
   * @return {object.accountKnown} - if the account is found in existing accounts
   * @return {object.accountShouldChangeName} - if the account's name should change
   */
  function accountComparison(existingAccount: IAccountData): {accountKnown: boolean, accountShouldChangeName: boolean} {
    // can't find account
    if (!existingAccount) return {accountKnown: false, accountShouldChangeName: false};

    // name is the same
    if (existingAccount.name === name) return {accountKnown: true, accountShouldChangeName: false}

    return {accountKnown: true, accountShouldChangeName: true}
  }

  useEffect(() => {
    const existingAccount = findExistingAccount();
    if (!existingAccount) return;

    const {accountKnown, accountShouldChangeName} = accountComparison(existingAccount);
  
    if (!accountKnown) {
      setChangeNameState('not found')
      return;
    }

    if (accountShouldChangeName) {
      
      
      setChangeNameState('working')
      updateAccountName(client, existingAccount)
      setChangeNameState('updated')
    } else {
      setChangeNameState('unchanged')
    }
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
