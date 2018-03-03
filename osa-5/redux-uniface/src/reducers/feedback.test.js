import deepFreeze from 'deep-freeze';
import * as feedbackActions from '../actions/feedback';
import feedbackReducer from './feedback';

describe('unicafe reducer', () => {
	const initialState = {
		positive: 0,
		neutral: 0,
		negative: 0
	};

	it('should return a proper initial state when called with undefined state', () => {
		const action = {
			type: 'DO_NOTHING'
		};

		const newState = feedbackReducer(undefined, action);
		expect(newState).toEqual(initialState);
	});

	it('positive is incremented', () => {
		const state = initialState;

		deepFreeze(state);
		const newState = feedbackReducer(state, feedbackActions.givePositiveFeedback());
		expect(newState).toEqual({
			positive: 1,
			neutral: 0,
			negative: 0
		});
	});

	it('neutral is incremented', () => {
		const state = initialState;

		deepFreeze(state);
		const newState = feedbackReducer(state, feedbackActions.giveNeutralFeedback());
		expect(newState).toEqual({
			positive: 0,
			neutral: 1,
			negative: 0
		});
	});

	it('negative is incremented', () => {
		const state = initialState;

		deepFreeze(state);
		const newState = feedbackReducer(state, feedbackActions.giveNegativeFeedback());
		expect(newState).toEqual({
			positive: 0,
			neutral: 0,
			negative: 1
		});
	});
});