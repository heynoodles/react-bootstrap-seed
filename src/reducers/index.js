import {combineReducers} from 'redux';
import componentsReducer from "./components";

let reducers = combineReducers({componentsReducer});

export default reducers;