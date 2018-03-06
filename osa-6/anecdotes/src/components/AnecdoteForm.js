import React from 'react';
import {connect} from 'react-redux';
import {create} from '../actions/anecdote';

class AnecdoteForm extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		this.props.create(content);

		e.target.anecdote.value = '';
	};

	render() {
		return (
			<div>
				<h2>{'create new'}</h2>
				<form onSubmit={this.handleSubmit}>
					<div><input name="anecdote"/></div>
					<button>{'create'}</button>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	create: content => dispatch(create(content))
});

export default connect(null, mapDispatchToProps)(AnecdoteForm);
