import React from 'react'
import {render} from 'ink-testing-library'
import wait from 'waait'

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
    test('updates account from accountId', () => {
      let mockContainerList;
      let wrapper;
      let mockChildren = jest.fn();
      const resultContainers = jest.fn()
      const mockList = jest.fn(() => {
        return new Promise((resolve) => {
          resolve({
            data: {
              container: resultContainers
            }
          })
        })
      });
    
      const mockUpdate = jest.fn(() => {
        return new Promise((resolve) => { resolve() })
      });
      const mockClient = {
        accounts: {
          containers: {
            list: mockList
          },
          update: mockUpdate
        }
      }
    
      const Account = getAccountWithContext(mockClient)
      const accountId = 1;
      const newName = 'new name'
      wrapper = render(
        <Account accountId={accountId}>
          {mockChildren}
        </Account>
      )

      expect(mockUpdate).toHaveBeenLastCalledWith({newName})
    })
  
  })

  test.todo('exposes containers to render prop function')
})
