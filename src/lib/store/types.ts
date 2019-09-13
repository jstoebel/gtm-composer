import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'
import * as C from './constants'

export interface IContainer extends tagmanager_v2.Schema$Container {
  tags: tagmanager_v2.Schema$Tag[]
  triggers: tagmanager_v2.Schema$Trigger[]
  variables: tagmanager_v2.Schema$Variable[]
}

export interface IAccount extends tagmanager_v2.Schema$Account {
  containers: IContainer[]
}

export interface IStore {
  accounts: IAccount[]
}

interface Action<Type, Payload> {
  type: Type
  payload: Payload
}

// reducer actions
export type Actions = Action<typeof C.UPDATE_ACCOUNTS, IAccount[] >
             | Action<typeof C.UPDATE_ACCOUNT_NAME, IAccount> 