import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3001/api';

export async function getPersons() {
	return (await axios.get(`${API_URL}/persons`)).data;
}

export async function addPerson(person) {
	return (await axios.post(`${API_URL}/persons`, person)).data;
}

export async function deletePerson(id) {
	await axios.delete(`${API_URL}/persons/${id}`);
}

export async function updatePerson(id, data) {
	try {
		return (await axios.put(`${API_URL}/persons/${id}`, data)).data;
	} catch (err) {
		return addPerson(data);
	}
}
