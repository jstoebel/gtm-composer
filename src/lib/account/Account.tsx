import React from 'react';
import {clientContext} from '../clientContext'
import AccountHelper from './AccountHelper'
import {IAccount} from './types'

const Account =  (props: IAccount) => {

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

export default Account
