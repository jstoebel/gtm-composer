import React, {Component} from 'react';
import {clientContext} from '../clientContext'
import AccountHelper from './AccountHelper'
import {AccountHelperProps} from './types'


const Account = (props: AccountHelperProps) => {
  return (
    <clientContext.Consumer>
      {(client) => {
        return (
        <AccountHelper client={client} {...props} >
          {this.props.children}
        </AccountHelper>
        )
      }}
    </clientContext.Consumer>
  )
}
export default Account
