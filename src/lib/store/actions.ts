import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'

export const getAccounts = (client: tagmanager_v2.Tagmanager) => {
  return async (dispatch) => {
    const result = await client.accounts.list()
    dispatch({type: 'addAccounts', payload: result.data.account})
  }
}