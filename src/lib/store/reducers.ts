import { Reducer } from 'redux';
import {IStore, Actions} from './types'
import _ from 'lodash';
import * as C from './constants'
// post on type narrowing https://stackoverflow.com/questions/56624326/typescript-not-inferring-types-in-switch-statement-when-generics-and-conditional

const initialState: IStore = {accounts: []};

const dataReducer:Reducer<IStore> = (state = initialState, action: Actions): IStore => {

  switch(action.type) {

    case C.UPDATE_ACCOUNTS:
      // update list of accounts in the store
      return {accounts: state.accounts.concat(action.payload)}

    case C.UPDATE_ACCOUNT_NAME:
      const newAccounts = _.cloneDeep(state.accounts).map((account) => {
        if (account.accountId === action.payload.accountId) {
          return {...account, name: action.payload.name}
        }
        return account
      })

      return {accounts: newAccounts};
    // case 'UPDATE_CONTAINERS':
    //   // could be array of containers or single container
    //   return state;
    // case 'UPDATE_CONTAINER':
    //   // update attributes of single container
    //   return state;
    // case 'DELETE_CONTAINER':
    //   return state;
    // case 'UPDATE_TAGS':
    //   // add a collection or single tag
    //   return state;
    // case 'UPDATE_TAG':
    //   //update attributes of single tag
    //   return state;
    // case 'DELETE_TAG':
    //   return state;

    // case 'UPDATE_TRIGGERS':
    //   // add a collection or single trigger
    //   return state;
    // case 'UPDATE_TRIGGER':
    //   //update attributes of single trigger
    //   return state;
    // case 'DELETE_TRIGGER':
    //   return state;

    // case 'UPDATE_VARIABLES':
    //   // add a collection or single variable
    //   return state;
    // case 'UPDATE_VARIABLE':
    //   //update attributes of single variable
    //   return state;
    // case 'DELETE_VARIABLE':
    //   return state;

    default:
      return state;
  }
}

export default dataReducer;

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
