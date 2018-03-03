import React from 'react';
import {connect} from 'react-redux';

class App extends React.Component {
	state = {input: ''};

	handleChangeInput = evt => {
		this.setState({input: evt.target.value});
	};

	handleSubmit = evt => {
		evt.preventDefault();
		this.props.create(this.state.input);
		this.setState({input: ''});
	};

	render() {
		const {anecdotes, vote} = this.props;
		return (
			<div>
				<h2>Anecdotes</h2>
				{anecdotes.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote.id)}>vote</button>
						</div>
					</div>
				)}
				<h2>create new</h2>
				<form onSubmit={this.handleSubmit}>
					<div><input onChange={this.handleChangeInput} value={this.state.input}/></div>
					<button>create</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({anecdotes: state});
const mapDispatchToProps = dispatch => ({
	vote: id => dispatch({type: 'VOTE', payload: {id}}),
	create: anecdote => dispatch({type: 'CREATE', payload: anecdote})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
