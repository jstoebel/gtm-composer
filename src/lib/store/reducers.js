"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var C = __importStar(require("./constants"));
// post on type narrowing https://stackoverflow.com/questions/56624326/typescript-not-inferring-types-in-switch-statement-when-generics-and-conditional
var initialState = { accounts: [] };
var dataReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case C.UPDATE_ACCOUNTS:
            // update list of accounts in the store
            return { accounts: state.accounts.concat(action.payload) };
        case C.UPDATE_ACCOUNT_NAME:
            var newAccounts = lodash_1.default.cloneDeep(state.accounts).map(function (account) {
                if (account.accountId === action.payload.accountId) {
                    return __assign(__assign({}, account), { name: action.payload.name });
                }
                return account;
            });
            return { accounts: newAccounts };
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
};
exports.default = dataReducer;
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
