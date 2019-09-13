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

// updateAccountName

export const updateAccountName = (client: tagmanager_v2.Tagmanager, account: IAccount) => {
  return async (dispatch) => {
    // update the name
    client.accounts.update(account)

    // update local state
    dispatch({
      type: 'UPDATE_ACCOUNT', payload: account
    })
  }
}