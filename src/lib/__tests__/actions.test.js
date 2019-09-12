import {fetchAccounts} from '../store/actions'

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
})