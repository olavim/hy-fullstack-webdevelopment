import produce from 'immer';
import {FeedbackAction} from '../actions/feedback';

export const initialState = {
	positive: 0,
	neutral: 0,
	negative: 0
};

const feedbackReducer = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case FeedbackAction.POSITIVE:
				draft.positive++;
				break;
			case FeedbackAction.NEUTRAL:
				draft.neutral++;
				break;
			case FeedbackAction.NEGATIVE:
				draft.negative++;
				break;
			default:
				break;
		}
	});

export default feedbackReducer;
