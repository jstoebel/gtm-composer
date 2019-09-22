import React, { useState, useEffect } from 'react';
import {IAccountHelper, IAccountData} from './types'

import {Box, Text} from 'ink'

const AccountHelper:React.FunctionComponent<IAccountHelper> = ({client, allAccounts, name, accountId, updateAccountName}) => {

  const [foundAccount, setFoundAccount] = useState<IAccountData>()
  const [changeNameState, setChangeNameState] = useState<'working' | 'updated' | 'unchanged' | 'not found'>('working')

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
      updateAccountName(client, {...existingAccount, name})
      setChangeNameState('updated')
    } else {
      setChangeNameState('unchanged')
    }

    setFoundAccount(existingAccount)
  }, [allAccounts])

  const displayName = (foundAccount && foundAccount.name) || 'unknown account'

  return (
    <Box>
      <Text>{displayName}</Text>
      {': '}
      <Text>{changeNameState}</Text>
    </Box>
  )
}

export default AccountHelper
