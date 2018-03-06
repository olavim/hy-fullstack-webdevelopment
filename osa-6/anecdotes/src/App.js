import React from 'react';
import {connect} from 'react-redux';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import {initAnecdotes} from './actions/anecdote';

class App extends React.Component {
	componentDidMount() {
		this.props.initAnecdotes();
	}

	render() {
		return (
			<div>
				<h1>{'Programming anecdotes'}</h1>
				<Notification/>
				<AnecdoteList/>
				<AnecdoteForm/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	initAnecdotes: () => dispatch(initAnecdotes())
});

export default connect(null, mapDispatchToProps)(App);
