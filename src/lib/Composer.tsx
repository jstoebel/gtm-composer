import React, {useEffect} from 'react'
import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'
import {clientContext} from './clientContext'
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import rootReducer from './store/reducers'
import {IAccount} from './types'

const store = createStore(rootReducer)

interface Props {
  client: tagmanager_v2.Tagmanager,
  children: (accounts: IAccount[]) => React.ReactElement,
  setAccounts: (accounts: IAccount[]) => void
  accounts: IAccount[]
}

const Composer: React.SFC = ({client, children, setAccounts, accounts}: Props) => {

  // const [accounts, setAccounts] = useState<tagmanager_v2.Schema$Account[]>([])

  useEffect(() => {
    async function fetchAccounts() {
      const result = await client.accounts.list()
      setAccounts(result.data.account)
    }
    fetchAccounts();
  }, [])

  return (
    <ReduxProvider store={store}>
      <clientContext.Provider value={client}>
        {children(accounts)}
      </clientContext.Provider>
    </ReduxProvider>
  )
}

export default Composer
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