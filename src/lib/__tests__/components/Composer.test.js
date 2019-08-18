import React from 'react'
import Composer from '../../Composer'
import {render} from 'ink-testing-library'
import wait from 'waait'
describe('Composer', () => {
  let mockList
  const resultAccounts = [{name: 'account1'}, {name: 'account2'}] // mock response from API

  const expectedAccounts = resultAccounts.map((account) => ({...account, containers: []}))
  let mockChildren;
  beforeEach(() => {
    mockList = jest.fn(() => {
      return new Promise((resolve) => {
        resolve({
          data: {
            account: resultAccounts
          }
        })
      })
    }).mockName('mockList');;
    const mockClient = {
      accounts: {
        list: mockList
      }
    }

    mockChildren = jest.fn();

    render(
      <Composer client={mockClient}>
        {mockChildren}
      </Composer>
    )

  })

  test('exposes accounts to render prop function', async () => {
    await wait(0)
    expect(mockChildren).toHaveBeenLastCalledWith(expectedAccounts)
  })
})