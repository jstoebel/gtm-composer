import React from 'react'
import {render} from 'ink-testing-library'

const getAccountWithContext = (client) => {
  jest.doMock('../clientContext', () => {
    return {
      clientContext: {
        Consumer: (props) => props.children(context)
      }
    }
  })

  return require('../account/Account').clientContext
}

describe('Account', () => {
  let mockContainerList;
  describe('fetches containers', () => {
    let resultContainers = jest.fn();

    let mockChildren = jest.fn();;
    let wrapper;

    beforeEach(() => {
      const mockList = jest.fn(() => {
        return new Promise((resolve) => {
          resolve({
            data: {
              containers: resultAccounts
            }
          })
        })
      });

      const mockClient = {
        containers: {
          list: mockList
        }
      }
      const Account = getAccountWithContext(mockClient)
      wrapper = render(
        <Account>
          {mockChildren}
        </Account>
      )
    });
    it('works!', () => {

    })
    // it('fetches all containers in account')
    // it('exposes containers to render props function')
  })

  describe('updates account name', () => {

    it('updates account name', () => {

    })
    
    it('leaves account name unchanged', () => {

    })

  })

})
