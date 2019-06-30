import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'

export interface AccountProps {
  accountId: number,
  name: string,
}

export interface AccountHelperProps extends AccountProps {
  client: tagmanager_v2.Tagmanager,
  children
}