import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'
import {AccountHelperProps} from './types'
import {Box} from 'ink'
import { useState } from 'react';

const AccountHelper = ({children, name}: AccountHelperProps) => {

  const [containers, setContainers] = useState<tagmanager_v2.Schema$Container[]>([])
  const [updateState, setUpdateState] = useState<'updating' | 'updated' | 'unchanged'>(null)
  // check that account has the given name, if not, update it

  // also, fetch and expose all containers in that account

  return (
    <Box>
      {children(containers)}
    </Box>
  )
}

export default AccountHelper
