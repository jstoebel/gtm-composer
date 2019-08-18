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
