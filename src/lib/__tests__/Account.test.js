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

  describe('fetches containers by accountId', () => {
    const accountId = 1
    beforeEach(() => {

      wrapper = render(
        <Account accountId={accountId}>
          {mockChildren}
        </Account>
      )
    })
    test('fetches all containers in account', async () => {
      await wait(0);
      expect(mockList).toHaveBeenLastCalledWith({ parent: `accounts/${accountId}`});
    })

    test('exposes containers to render props function', async () => {
      await wait(0);
      expect(mockChildren).toHaveBeenLastCalledWith(resultContainers)
    })
  })

  describe('updates account name', () => {
    beforeEach(() => {

    })
    it('updates account name', async () => {
      wrapper = render(
        <Account name= {'Old Name'} newName={'New Name'}>
          {mockChildren}
        </Account>
      )
      await wait(0);
      expect(mockUpdate).toHaveBeenLastCalledWith({requestBody: {name: 'New Name'}});
    })
    
    it('leaves account name unchanged', async () => {
      wrapper = render(
        <Account name={'Old Name'} newName={'Old Name'}>
          {mockChildren}
        </Account>
      )
      await wait(0);
      expect(mockUpdate).not.toHaveBeenCalled();
    })

    it('leaves name unchanged when no name given', async () => {
      wrapper = render(
        <Account name={'Old Name'}>
          {mockChildren}
        </Account>
      )
      await wait(0);
      expect(mockUpdate).not.toHaveBeenCalled()
    })

    it('leaves name unchanged when no newName given', async () => {
      wrapper = render(
        <Account newName={'New Name'}>
          {mockChildren}
        </Account>
      )
      await wait(0);
      expect(mockUpdate).not.toHaveBeenCalled()
    })

  })
})
