import { createStore,compose, applyMiddleware } from 'redux';
import rootReducer from './../reducers';
import thunkMiddleware from 'redux-thunk'

/* const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware),
); */

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunkMiddleware)))
export default store;
