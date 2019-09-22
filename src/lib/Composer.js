"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var clientContext_1 = require("./clientContext");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var reducers_1 = __importDefault(require("./store/reducers"));
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var react_redux_2 = require("react-redux");
var actions_1 = require("./store/actions");
var middleware = [redux_thunk_1.default];
var store = redux_1.createStore(redux_1.combineReducers({
    data: reducers_1.default
}), redux_1.applyMiddleware.apply(void 0, middleware));
var Composer = function (_a) {
    var client = _a.client, children = _a.children, fetchAccounts = _a.fetchAccounts, accounts = _a.accounts;
    react_1.useEffect(function () {
        fetchAccounts(client);
    }, []);
    return (react_1.default.createElement(clientContext_1.clientContext.Provider, { value: client }, children(accounts)));
};
var mapStateToProps = function (state, _ownProps) {
    return { accounts: state.data.accounts };
};
var mapDispatchToProps = function (dispatch) { return ({
    fetchAccounts: function (client) { return dispatch(actions_1.fetchAccounts(client)); }
}); };
var ConnectedComposer = react_redux_2.connect(mapStateToProps, mapDispatchToProps)(Composer);
var ComposerWithState = function (_a) {
    var children = _a.children, client = _a.client;
    return (react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(ConnectedComposer, { client: client }, children)));
};
exports.default = ComposerWithState;
