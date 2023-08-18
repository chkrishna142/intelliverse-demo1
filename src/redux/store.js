import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import { auth_reducer as authReducer } from './Auth/auth.reducer';
import { reducer as appReducer } from './App/reducer';

const rootReducer = combineReducers({
  authReducer,
  appReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
