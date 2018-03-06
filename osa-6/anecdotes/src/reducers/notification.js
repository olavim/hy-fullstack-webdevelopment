const reducer = (store = null, action) => {
	if (action.type === 'NOTIFICATION_SHOW') {
		return {text: action.text, id: action.id};
	}

	if (action.type === 'NOTIFICATION_HIDE') {
		if (store && store.id === action.id) {
			return null;
		}
	}

	return store;
};

export default reducer;