import React, {Component} from 'react';
import {ClientContext} from '../Composer'
import AccountHelper from './AccountHelper'
import {AccountHelperProps} from './type'


const Account = (props: AccountHelperProps) => {
  return (
    <ClientContext.Consumer>
      {(client) => {
        <AccountHelper client={client} {...props} >
          {this.props.children}
        </AccountHelper>
      }}
    </ClientContext.Consumer>
  )
}
export default Account
