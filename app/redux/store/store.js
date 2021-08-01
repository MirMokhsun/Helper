import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk  from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from '../reducers/rootReducer.js';
import { composeWithDevTools } from 'remote-redux-devtools';

const middleware = [ReduxThunk];
const store = createStore(rootReducer, compose(composeWithDevTools(applyMiddleware(...middleware))));
export default store;