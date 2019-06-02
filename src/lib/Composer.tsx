import {Color, Text} from 'ink';
import React, {Component} from 'react';
import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'

interface Props {
  client: tagmanager_v2.Tagmanager
}

interface State {
  accounts: tagmanager_v2.Schema$Account[]
}

export class Composer extends Component<Props, State> {
  constructor(p, s) {
    super(p, s)
    this.state = {
      accounts: []
    }
  }

  async componentDidMount() {
    const result = await this.props.client.accounts.list()
    this.setState({
      accounts: result.data.account
    })
  }

  eachAccount() {
    return this.state.accounts.map((account) => {
      return <Text>{account.name}</Text>
    })
  }
  
  render() {
    return (
      <Color bgGreen black>
        {this.eachAccount()}
      </Color>
    )
  }
}

// export const Composer = ({client}: Props) => {
  
//   const [accounts, setAccounts] = useState<tagmanager_v2.Schema$Account[]>([])
  
//   useEffect(() => {
//     // const fetchData = async () => {
//     //   const result = await client.accounts.list()
//     //   setAccounts(result.data.account)
//     // }

//     // fetchData();

//     client.accounts.list().then(({data}) => setAccounts(data.account))
//   }, [])

//   const eachAccount = () => {
//     return accounts.map((account) => {
//       return <Text>{account.name}</Text>
//     })
//   }
//   return (
//     <Color bgGreen black>
//       <Text>{'Account names'}</Text>
//       {eachAccount()}
//     </Color>
//   )
// }
