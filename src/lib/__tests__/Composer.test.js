import React from 'react'
import Composer from '../Composer'
import {render} from 'ink-testing-library'
import getElementWithContext from 'react-test-context-provider'

describe('Composer', () => {
  let mockList
  let resultAccounts = ['account1', 'account2']
  let wrapper;
  beforeEach(() => {
    mockList = jest.fn(() => {
      return new Promise((resolve) => {
        resolve(resultAccounts)
      })
    });
    const mockClient = {
      accounts: {
        list: mockList
      }
    }
    wrapper = render(<Composer client={mockClient}/>)
  })
  test('fetches all account names', () => {
    expect(mockList).toHaveBeenCalledTimes(1)
  })

  test('loads account names into children', () => {

  })

})