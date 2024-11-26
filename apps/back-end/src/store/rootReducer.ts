import { combineReducers } from 'redux';
import { headerReducer } from './header';
import { authReducer } from './auth';

const rootReducer = combineReducers({
  header: headerReducer,
  auth: authReducer,
});

export default rootReducer;
