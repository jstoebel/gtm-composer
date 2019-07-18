import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'

export interface AccountProps {
  data: tagmanager_v2.Schema$Account, // the account's current data
  name?: string, // the desired name for the account
  children?
}

export interface AccountHelperProps extends AccountProps {
  client: tagmanager_v2.Tagmanager,
}