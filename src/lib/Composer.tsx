import React, {useEffect} from 'react'
import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'
import {clientContext} from './clientContext'
import { createStore, applyMiddleware } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import rootReducer from './store/reducers'
import {IAccount} from './types'
import thunk from 'redux-thunk'
import { connect } from 'react-redux'
import {fetchAccounts} from './store/actions'

const middleware = [ thunk ]
const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)

interface Props {
  client: tagmanager_v2.Tagmanager,
  children: (accounts: IAccount[]) => React.ReactElement,
  fetchAccounts: (client: tagmanager_v2.Tagmanager) => void
  accounts: IAccount[]
}

const Composer: React.SFC = ({client, children, fetchAccounts, accounts}: Props) => {

  useEffect(() => {
    fetchAccounts(client)
  }, [])

  return (
    <ReduxProvider store={store}>
      <clientContext.Provider value={client}>
        {children(accounts)}
      </clientContext.Provider>
    </ReduxProvider>
  )
}


export default connect(() => ({}), {fetchAccounts})(Composer)

// export class Composer extends Component<Props, State> {
//   constructor(p, s) {
//     super(p, s)
//     this.state = {
//       accounts: []
//     }
//   }

//   componentDidMount() {
//     async function fetchAccounts() {
//       const result = await this.props.client.accounts.list()
//       this.setState({accounts: result.data.account})
//     }
//     fetchAccounts.bind(this)();
//   }

//   render() {
//     const {client, children} = this.props
//     return (
//       <clientContext.Provider value={client}>
//         {children(this.state.accounts)}
//       </clientContext.Provider>
//     )
//   }
// }