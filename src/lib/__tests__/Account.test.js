import React from 'react'
import {render} from 'ink-testing-library'
import wait from 'waait'

const getAccountWithContext = (client) => {
  jest.doMock('../clientContext', () => {
    return {
      clientContext: {
        Consumer: (props) => props.children(client)
      }
    }
  })

  return require('../account/Account').default
}

describe('Account', () => {
  let mockContainerList;
  describe('fetches containers', () => {
    let resultContainers = jest.fn()

    let mockChildren = jest.fn();
    let wrapper;
    let mockList;
    beforeEach(() => {
      mockList = jest.fn(() => {
        return new Promise((resolve) => {
          resolve({
            data: {
              container: resultContainers
            }
          })
        })
      });

      const mockClient = {
        accounts: {
          containers: {
            list: mockList
          }
        }
      }
      const Account = getAccountWithContext(mockClient)

      wrapper = render(
        <Account>
          {mockChildren}
        </Account>
      )
    });
    test('fetches all containers in account', async () => {
      await wait(0);
      expect(mockList).toHaveBeenCalledTimes(1);
    })

    test('exposes containers to render props function', async () => {
      await wait(0);
      expect(mockChildren).toHaveBeenLastCalledWith(resultContainers)
    })
  })

  describe('updates account name', () => {

    // it('updates account name', () => {

    // })
    
    // it('leaves account name unchanged', () => {

    // })
  })
})
