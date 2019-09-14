import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'
import {IAccount, IContainer} from './types'

export const fetchAccounts = (client: tagmanager_v2.Tagmanager) => {
  return async (dispatch) => {
    const result = await client.accounts.list()
    const accounts: IAccount[] = result.data.account.map((account) => {
      return {...account, containers: [] as IContainer[]}
    })
    dispatch({
      type: 'UPDATE_ACCOUNTS', payload: accounts
    })
  }
}

/**
 * Update the name of a GTM Account.
 * Note: Does not check if name needs changing. That responsability is on the caller/
 * @param client updateAccountName
 * @param {IAccount} account
 */
export const updateAccountName = (client: tagmanager_v2.Tagmanager, account: IAccount) => {
  return async (dispatch) => {
    // update the name
    await client.accounts.update(account)

    // update local state
    dispatch({
      type: 'UPDATE_ACCOUNT_NAME', payload: account
    })
  }
}