import {Color} from 'ink';
import React from 'react';
import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'

interface Props {
  client: tagmanager_v2.Tagmanager
}

export const Composer = ({client}: Props) => {
  return (
    <Color bgGreen black>
      {`hello from client! ${client}`}
    </Color>
  )
}
