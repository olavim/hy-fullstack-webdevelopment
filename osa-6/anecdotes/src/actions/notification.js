export function notify(text, durationSeconds) {
	return dispatch => {
		const notifId = Math.floor(Math.random() * 1000000);
		dispatch(show(notifId, text));
		setTimeout(() => dispatch(hide(notifId)), durationSeconds * 1000);
	};
}

export function show(id, text) {
	return dispatch => {
		dispatch({type: 'NOTIFICATION_SHOW', text, id});
	};
}

export function hide(id) {
	return dispatch => {
		dispatch({type: 'NOTIFICATION_HIDE', id});
	};
}