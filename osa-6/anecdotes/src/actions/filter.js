export function set(text) {
	return dispatch => {
		dispatch({type: 'FILTER_SET', text});
	};
}
