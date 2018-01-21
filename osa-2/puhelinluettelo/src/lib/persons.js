import axios from 'axios';

export async function getPersons() {
	return (await axios.get('http://localhost:3001/persons')).data;
}

export async function addPerson(person) {
	return (await axios.post('http://localhost:3001/persons', person)).data;
}

export async function deletePerson(id) {
	await axios.delete(`http://localhost:3001/persons/${id}`);
}

export async function updatePerson(id, data) {
	try {
		return (await axios.put(`http://localhost:3001/persons/${id}`, data)).data;
	} catch (err) {
		return addPerson(data);
	}
}
