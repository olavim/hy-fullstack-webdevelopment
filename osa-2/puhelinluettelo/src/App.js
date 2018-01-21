import React from 'react';
import {getPersons, addPerson, deletePerson, updatePerson} from './lib/persons';

const Numbers = ({entries, onDelete}) => (
	<table>
		<tbody>
		{entries.map((p => (
			<tr key={p.name}>
				<td>{p.name}</td>
				<td>{p.number}</td>
				<td><button onClick={() => onDelete(p)}>poista</button></td>
			</tr>
		)))}
		</tbody>
	</table>
);

const NumberForm = ({onSubmit, onChangeName, onChangeNumber, name, number}) => (
	<form onSubmit={onSubmit}>
		<div>
			nimi: <input onChange={onChangeName} value={name}/>
		</div>
		<div>
			numero: <input onChange={onChangeNumber} value={number}/>
		</div>
		<div>
			<button type="submit">lisää</button>
		</div>
	</form>
);

const Notification = ({message}) => (
	message === null ?
		null :
		<div className="notification">{message}</div>
);

export default class App extends React.Component {
	state = {
		persons: new Map(),
		newName: '',
		newNumber: '',
		filter: '',
		message: null
	};

	async componentWillMount() {
		const persons = await getPersons();
		this.setState({persons: new Map(persons.map(p => [p.name, p]))});
	}

	handleChangeFilter = evt => {
		this.setState({filter: evt.target.value});
	};

	handleChangeName = evt => {
		this.setState({newName: evt.target.value});
	};

	handleChangeNumber = evt => {
		this.setState({newNumber: evt.target.value});
	};

	handleSubmit = async(evt) => {
		evt.preventDefault();
		const {persons, newName, newNumber} = this.state;

		if (persons.has(newName)) {
			if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
				const oldPerson = persons.get(newName);
				const newPerson = await updatePerson(oldPerson.id, {name: newName, number: newNumber});
				const newPersons = new Map(persons);
				newPersons.set(newName, newPerson);
				this.setState({
					persons: newPersons,
					newName: '',
					newNumber: '',
					message: `päivitettiin ${newName}`
				});
			}
		} else {
			const newPerson = await addPerson({name: newName, number: newNumber});
			const newPersons = new Map(persons);
			newPersons.set(newName, newPerson);
			this.setState({
				persons: newPersons,
				newName: '',
				newNumber: '',
				message: `lisättiin ${newName}`
			});
		}
	};

	handleDeletePerson = async(person) => {
		if (window.confirm(`poistetaanko ${person.name}`)) {
			await deletePerson(person.id);
			const newPersons = new Map(this.state.persons);
			newPersons.delete(person.name);

			this.setState({
				persons: newPersons,
				message: `poistettiin ${person.name}`
			});
		}
	};

	render() {
		const {persons, filter, newName, newNumber, message} = this.state;
		const entries = Array.from(persons.values())
			.filter(({name}) => name.toLowerCase().startsWith(filter.toLowerCase()));

		return (
			<div>
				<h2>Puhelinluettelo</h2>
				<Notification message={message}/>
				<div>
					rajaa näytettäviä: <input onChange={this.handleChangeFilter} value={this.state.filter}/>
				</div>
				<h2>Lisää uusi</h2>
				<NumberForm
					onSubmit={this.handleSubmit}
					onChangeName={this.handleChangeName}
					onChangeNumber={this.handleChangeNumber}
					name={newName}
					number={newNumber}
				/>
				<h2>Numerot</h2>
				<Numbers entries={entries} onDelete={this.handleDeletePerson}/>
			</div>
		)
	}
}
