import {fetchAccounts, updateAccountName} from '../store/actions'

describe('action dispatches', () => {
  describe('fetchAccounts', () => {
    test('dispatches accounts to store', async () => {

      const mockDispatchedAccount = {name: 'an account', containers: []}
      const mockData = [ mockDispatchedAccount ]

      const client = {
        accounts: {
          list: () => {
            return new Promise((resolve) => {
              resolve({
                data: {
                  account: mockData
                }
              })
            })
          }
        }
      }

      const innerFunc = fetchAccounts(client)

      const mockDispatch = jest.fn().mockName('dispatch')

      await innerFunc(mockDispatch)
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE_ACCOUNTS', payload: mockData
      })
    })
  })

  describe('updateAccountName', () => {
    test('updates the account', async () => {
      const mockDispatchedAccount = {name: 'an account', containers: []}
      const mockUpdate = jest.fn(async (account) => new Promise(resolve => resolve()));
      const client = {
        accounts: {
          update: mockUpdate
        }
      }

      const innerFunc = updateAccountName(client, mockDispatchedAccount)
      const mockDispatch = jest.fn().mockName('dispatch')

      await innerFunc(mockDispatch);
      expect(mockUpdate).toHaveBeenCalledWith(mockDispatchedAccount)
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE_ACCOUNT', payload: mockDispatchedAccount
      })
    })
  })

})