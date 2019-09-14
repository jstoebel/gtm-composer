import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'
import React from 'react';
import {clientContext} from '../clientContext'
import AccountHelper from './AccountHelper'
import {IAccount} from './types'
import { updateAccountName } from '../store/actions';
import { connect } from 'react-redux'

const Account = (props: IAccount) => {
  return (
    <clientContext.Consumer>
      {(client: tagmanager_v2.Tagmanager) => {
        return (
        <AccountHelper client={client} {...props} >
          {props.children}
        </AccountHelper>
        )
      }}
    </clientContext.Consumer>
  )
}

const mapStateToProps = (state) => {
  return {accounts: state.data.accounts}
}

const mapDispatchToProps = { updateAccountName }

const ConnectedAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)

export default ConnectedAccount
