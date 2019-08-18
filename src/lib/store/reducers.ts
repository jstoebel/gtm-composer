
import { combineReducers } from 'redux';
import {IStore} from './types'
import {tagmanager_v2} from 'googleapis/build/src/apis/tagmanager/v2'


const initialState: IStore = {accounts: []};

type Actions = 'UPDATE_ACCOUNTS' | 'UPDATE_ACCOUNT' | 'UPDATE_CONTAINERS' | 'UPDATE_CONTAINER' | 'DELETE_CONTAINER' | 'UPDATE_TAGS' | 'UPDATE_TAG' | 'DELETE_TAG' | 'UPDATE_TRIGGERS' | 'UPDATE_TRIGGER' | 'DELETE_TRIGGER' | 'UPDATE_VARIABLES' | 'UPDATE_VARIABLE' | 'DELETE_VARIABLE'

type AddAccountPayload = tagmanager_v2.Schema$Account[]

type Payload = AddAccountPayload

function  dataReducer(state=initialState, action: {type: Actions, payload: Payload}) { // fix the any on payloads
  switch(action.type) {
    case 'UPDATE_ACCOUNTS':
      // recieve an array of accounts, concat to the current array
      return state;
    case 'UPDATE_ACCOUNT':
      return state;
    case 'UPDATE_CONTAINERS':
      // could be array of containers or single container
      return state;
    case 'UPDATE_CONTAINER':
      // update attributes of single container
      return state;
    case 'DELETE_CONTAINER':
      return state;
    case 'UPDATE_TAGS':
      // add a collection or single tag
      return state;
    case 'UPDATE_TAG':
      //update attributes of single tag
      return state;
    case 'DELETE_TAG':
      return state;

    case 'UPDATE_TRIGGERS':
      // add a collection or single trigger
      return state;
    case 'UPDATE_TRIGGER':
      //update attributes of single trigger
      return state;
    case 'DELETE_TRIGGER':
      return state;

    case 'UPDATE_VARIABLES':
      // add a collection or single variable
      return state;
    case 'UPDATE_VARIABLE':
      //update attributes of single variable
      return state;
    case 'DELETE_VARIABLE':
      return state;

    default:
      return state;
  }
}

export default combineReducers({
  dataReducer
})
/**
 * accounts:
 *  standard
 *  containers:
 *    standard_data
 *    tags
 *    triggers
 *    variables
 * 
 * idea for organizing data: think of it like a relational database https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
 */
