import rootReducer from '../store/reducers'
import * as C from '../store/constants'

describe('reducers', () => {
  test('UPDATE_ACCOUNTS', () => {

    const account = {name: 'my account'}
    const newAccount = {name: 'second account'}
    const initialState = {
      accounts: [account]
    };
    const result = rootReducer(
      initialState,
      {
        type: C.UPDATE_ACCOUNTS,
        payload: [newAccount]
      }
    )

    expect(result).toEqual({accounts: [account, newAccount]})
  })

  test('UPDATE_ACCOUNT_NAME', () => {
    const account = {accountId: 1, name: 'my account'}
    const secondAccount = {accountId: 2, name: 'second account'}
    const initialState = {
      accounts: [account, secondAccount]
    };

    const result = rootReducer(
      initialState,
      {
        type: C.UPDATE_ACCOUNT_NAME,
        payload: {accountId: 1, name: 'new name'}
      }
    )

    expect(result).toEqual(
      {
        accounts: [
          {accountId: 1, name: 'new name'},
          secondAccount,
        ]
      }
    )
  })
})