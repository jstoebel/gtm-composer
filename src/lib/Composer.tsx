import React, {useEffect} from 'react'
import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'
import {clientContext} from './clientContext'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import reducer from './store/reducers'
import {IAccount} from './types'
import thunk from 'redux-thunk'
import { connect } from 'react-redux'
import {fetchAccounts} from './store/actions'
import {ICombinedStore} from './store/types'

const middleware = [ thunk ]
const store = createStore(
  combineReducers({
    data: reducer
  }),
  applyMiddleware(...middleware)
)

interface IComposerWithState {
  client: tagmanager_v2.Tagmanager,
  children: (accounts: IAccount[]) => React.ReactElement | React.ReactElement[],
}

interface IComposer extends IComposerWithState {
  fetchAccounts: (client: tagmanager_v2.Tagmanager) => void
  accounts: IAccount[]
}

const Composer: React.FunctionComponent = ({client, children, fetchAccounts, accounts}: IComposer) => {

  useEffect(() => {
    fetchAccounts(client)
  }, [])

  return (
    <clientContext.Provider value={client}>
      {children(accounts)}
    </clientContext.Provider>
  )
}

const mapStateToProps = (state: ICombinedStore, _ownProps) => {
  return {accounts: state.data.accounts}
}

const mapDispatchToProps = (dispatch) => ({
  fetchAccounts: (client) => dispatch(fetchAccounts(client))
})

const ConnectedComposer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Composer)

const ComposerWithState = ({children, client}: IComposerWithState) => {
  return (
    <ReduxProvider store={store}>
      <ConnectedComposer client={client}>
        {children}
      </ConnectedComposer>
    </ReduxProvider>
  )
}

export default ComposerWithState;
