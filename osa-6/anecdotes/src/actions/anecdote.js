import {notify} from './notification';
import * as anecdoteService from '../services/anecdotes';

export function vote(anecdote) {
	return async dispatch => {
		await anecdoteService.vote(anecdote);
		dispatch(notify(`you voted '${anecdote.content}'`, 5));
		dispatch({type: 'VOTE', id: anecdote.id});
	};
}

export function create(content) {
	return async dispatch => {
		await anecdoteService.add(content);
		dispatch({type: 'CREATE', content});
	};
}

export function initAnecdotes() {
	return async dispatch => {
		const content = await anecdoteService.getAll();
		dispatch({type: 'INIT', content});
	};
}
