import React from 'react';
import {clientContext} from '../clientContext'
import AccountHelper from './AccountHelper'
import {Account} from './types'

export const Account =  (props: Account) => {

  return (
    <clientContext.Consumer>
      {(client) => {
        return (
        <AccountHelper client={client} {...props} >
          {props.children}
        </AccountHelper>
        )
      }}
    </clientContext.Consumer>
  )

}

