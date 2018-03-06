import axios from 'axios';

export async function getAll() {
	return (await axios.get('http://localhost:3001/anecdotes')).data;
}

export async function add(content) {
	await axios.post('http://localhost:3001/anecdotes', {content, votes: 0});
}

export async function vote({id, content, votes}) {
	await axios.put(`http://localhost:3001/anecdotes/${id}`, {content, votes: votes + 1});
}
