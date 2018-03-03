export const FeedbackAction = {
	POSITIVE: 'FEEDBACK_POSITIVE',
	NEUTRAL: 'FEEDBACK_NEUTRAL',
	NEGATIVE: 'FEEDBACK_NEGATIVE'
};

export const givePositiveFeedback = () => ({
	type: FeedbackAction.POSITIVE
});

export const giveNeutralFeedback = () => ({
	type: FeedbackAction.NEUTRAL
});

export const giveNegativeFeedback = () => ({
	type: FeedbackAction.NEGATIVE
});
