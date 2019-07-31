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

  describe('fetches containers', () => {
    beforeEach(() => {

      wrapper = render(
        <Account data={{accountId: 1}}>
          {mockChildren}
        </Account>
      )
    })
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
    beforeEach(() => {

    })
    it('updates account name', async () => {
      wrapper = render(
        <Account data={{name: 'Old Name'}} name={'New Name'}>
          {mockChildren}
        </Account>
      )
      await wait(0);
      expect(mockUpdate).toHaveBeenLastCalledWith({requestBody: {name: 'New Name'}});
    })
    
    it('leaves account name unchanged', async () => {
      wrapper = render(
        <Account data={{name: 'Old Name'}} name={'Old Name'}>
          {mockChildren}
        </Account>
      )
      await wait(0);
      expect(mockUpdate).not.toHaveBeenCalled();
    })

    it('leaves name unchanged when none given', async () => {
      wrapper = render(
        <Account data={{name: 'Old Name'}}>
          {mockChildren}
        </Account>
      )
      await wait(0);
      expect(mockUpdate).not.toHaveBeenCalled()
    })
  })
})
