//This is the root reducer - combines together all reducers
import { combineReducers } from 'redux';
import itemReducer from './ItemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';


export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer
})