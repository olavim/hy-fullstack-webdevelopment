import {combineReducers} from 'redux';
import anecdoteReducer from './anecdote';
import notificationReducer from './notification';
import filterReducer from './filter';

export default combineReducers({
	anecdote: anecdoteReducer,
	notification: notificationReducer,
	filter: filterReducer
});
