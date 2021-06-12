import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { createEpicMiddleware } from 'redux-observable';
// import rootEpic from './epics';
import rootReducer from './reducers';

// const epicMiddleware = createEpicMiddleware()
const middlewares = [];

const store = createStore(
  combineReducers(rootReducer),
  composeWithDevTools(applyMiddleware(...middlewares)),
);

// epicMiddleware.run(rootEpic)

export default store;
