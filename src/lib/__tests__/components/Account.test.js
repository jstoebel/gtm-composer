import React from 'react'
import {render} from 'ink-testing-library'
import wait from 'waait'
import Composer from '../../Composer'
import Account from '../../account/Account'

const getAccountWithContext = (client) => {
  jest.doMock('../../clientContext', () => {
    return {
      clientContext: {
        Consumer: (props) => props.children(client)
      }
    }
  })
  return require('../../account/Account').default
}

describe('Account', () => {
  describe('updates account name', () => {
    test('updates account name from accountId', async () => {
      let mockContainerList;
      let wrapper;
      let mockChildren = jest.fn();
      const resultContainers = jest.fn()
      const mockList = jest.fn(() => {
        return new Promise((resolve) => {
          resolve({
            data: {
              container: []
            }
          })
        })
      });
    

      const mockListAccounts = jest.fn(() => {
        console.log('mockListAccounts was called');
        
        return new Promise((resolve) => {
          resolve({
            data: {
              account: [{name: 'first account', accountId: 1}]
            }
          })
        })
      })
      const mockUpdate = jest.fn(() => {
        return new Promise((resolve) => { resolve() })
      });
      const mockClient = {
        accounts: {
          containers: {
            list: mockList
          },
          update: mockUpdate,
          list: mockListAccounts
        }
      }

      const accountId = 1;
      const newName = 'new name'

      render(
        <Composer client={mockClient}>
          {
            (_accounts) => {
              return (
                <Account accountId={accountId}>
                  {mockChildren}
                </Account>
              )
            }
          }
        </Composer>
      )
      await wait(500)
      expect(mockUpdate).toHaveBeenLastCalledWith({name: 'first account', accountId: 1, containers: []})
    })
  })

  test.todo('exposes containers to render prop function')
})
