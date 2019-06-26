import React from 'react'
import Composer from '../Composer'
import {render} from 'ink-testing-library'

describe('Composer', () => {
  let mockList
  let resultAccounts = ['account1', 'account2']

  let mockChildren;
  let wrapper;
  beforeEach(() => {
    mockList = jest.fn(() => {
      return new Promise((resolve) => {
        resolve({
          data: {
            account: resultAccounts
          }
        })
      })
    });
    const mockClient = {
      accounts: {
        list: mockList
      }
    }

    mockChildren = jest.fn();
    wrapper = render(
      <Composer client={mockClient}>
        {mockChildren}
      </Composer>
    )
  })

  test('fetches all account names', () => {
    expect(mockList).toHaveBeenCalledTimes(1)
  })

  test('exposes accounts to render prop function', () => {
    expect(mockChildren).toHaveBeenLastCalledWith(resultAccounts)
  })

})