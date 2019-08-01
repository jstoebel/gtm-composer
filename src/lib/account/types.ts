import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'

export interface AccountProps {
  accountId: number
  name?: string // the current name for the account
  newName?: string // the desired name for the account
  children?
}

export interface AccountHelperProps extends AccountProps {
  client: tagmanager_v2.Tagmanager,
}
