const getId = () => (
	100000 * Math.random()
).toFixed(0);

const initialState = [];

const reducer = (store = initialState, action) => {
	if (action.type === 'INIT') {
		return action.content;
	}

	if (action.type === 'VOTE') {
		const old = store.filter(a => a.id !== action.id);
		const voted = store.find(a => a.id === action.id);

		return [...old, {...voted, votes: voted.votes + 1}];
	}

	if (action.type === 'CREATE') {
		return [...store, {content: action.content, id: getId(), votes: 0}];
	}

	return store;
};

export default reducer;