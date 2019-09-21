import React, { useState, useEffect } from 'react';
import {IAccountHelper, IAccountData} from './types'
import { loadavg } from 'os';
// import {Box, Color} from 'ink'

const AccountHelper:React.FunctionComponent<IAccountHelper> = ({client, allAccounts, name, accountId, updateAccountName}) => {

  const [changeNameState, setChangeNameState] = useState<'working' | 'updated' | 'unchanged' | 'not found'>()

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
    console.log('existingAccount', existingAccount);
    
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
  }, [allAccounts])

  return <div></div>
}

export default AccountHelper
