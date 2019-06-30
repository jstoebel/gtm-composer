import React from 'react';
import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'

export const clientContext = React.createContext<tagmanager_v2.Tagmanager>(null);