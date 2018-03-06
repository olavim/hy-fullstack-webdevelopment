const reducer = (store = '', action) => {
	if (action.type === 'FILTER_SET') {
		return action.text;
	}

	return store;
};

export default reducer;
