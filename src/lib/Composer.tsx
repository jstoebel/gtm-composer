import React, {useState, useEffect} from 'react'
import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'

interface Props {
  client: tagmanager_v2.Tagmanager,
  children: (accounts) => React.ReactElement
}

export const ClientContext = React.createContext<tagmanager_v2.Tagmanager>(null);

const Composer = ({client, children}: Props) => {
  const [accounts, setAccounts] = useState<tagmanager_v2.Schema$Account[]>([])

  useEffect(() => {
    async function fetchAccounts() {
      const result = await client.accounts.list()
      setAccounts(result.data.account)
    }

    fetchAccounts();
  })

  return (
    <ClientContext.Provider value={client}>
      {children(accounts)}
    </ClientContext.Provider>
  )
}

export default Composer