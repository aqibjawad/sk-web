import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // For handling async actions
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  // other reducers...
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
