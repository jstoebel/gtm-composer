import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'

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

export type IAction = 'UPDATE_ACCOUNTS' | 'UPDATE_ACCOUNT' | 'UPDATE_CONTAINERS' | 'UPDATE_CONTAINER' | 'DELETE_CONTAINER' | 'UPDATE_TAGS' | 'UPDATE_TAG' | 'DELETE_TAG' | 'UPDATE_TRIGGERS' | 'UPDATE_TRIGGER' | 'DELETE_TRIGGER' | 'UPDATE_VARIABLES' | 'UPDATE_VARIABLE' | 'DELETE_VARIABLE'