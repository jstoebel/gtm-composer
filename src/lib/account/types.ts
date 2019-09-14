import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'
import { IAccount } from './types'
export interface IAccount extends tagmanager_v2.Schema$Account {
  children?(containers: tagmanager_v2.Schema$Container[]): React.ReactElement
}

export interface IAccountHelper extends IAccount {
  client: tagmanager_v2.Tagmanager
}

/**
 * Data Layer Interfaces
 */
export interface IAccountData extends tagmanager_v2.Schema$Account {
  containers: IContainerData[]
}

export interface IContainerData extends tagmanager_v2.Schema$Container {
  tags: tagmanager_v2.Schema$Tag[]
  triggers: tagmanager_v2.Schema$Trigger[]
  variables: tagmanager_v2.Schema$Variable[]
}
