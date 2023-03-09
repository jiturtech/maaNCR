// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
import authReducer from './authReducer';
import extraReducer from './extraReducer';
import homeReducer from './homeReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  extraReducer,
  homeReducer,
  authReducer,
});
// Exports
export default rootReducer;
