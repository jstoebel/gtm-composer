import React from 'react';
import {clientContext} from '../clientContext'
import AccountHelper from './AccountHelper'
import {AccountProps} from './types'

export const Account =  (props: AccountProps) => {

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

