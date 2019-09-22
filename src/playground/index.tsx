import * as React from 'react'
import Composer from '../index'
import Account from '../lib/account/Account'

import {render} from 'ink'
import client from './client'

render(
  <Composer client={client}>
    {(accounts) => {
      return accounts.map((account, i) => <Account key={i} {...account} name={`${account.name}-new`}></Account>)
    }}
  </Composer>
);
