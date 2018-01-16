import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
	state = {
		selected: 0,
		votes: {}
	};

	handleShowNextAnecdote = () => {
		const numAnecdotes = this.props.anecdotes.length;
		const nextIndex = Math.floor(Math.random() * numAnecdotes);
		this.setState({selected: nextIndex});
	};

	handleVoteAnecdote = () => {
		const {selected, votes} = this.state;
		const votesNow = votes[selected] || 0;
		this.setState({
			votes: Object.assign({}, votes, {[selected]: votesNow + 1})
		});
	};

	render() {
		const {selected, votes} = this.state;
		let maxAnecdote = 0;
		for (const i of Object.keys(votes)) {
			if (votes[i] > (votes[maxAnecdote] || 0)) {
				maxAnecdote = i;
			}
		}

		return (
			<div>
				<div>{this.props.anecdotes[selected]}</div>
				<div>has {votes[selected] || 0} votes</div>
				<div>
					<button onClick={this.handleVoteAnecdote}>vote</button>
					<button onClick={this.handleShowNextAnecdote}>next anecdote</button>
				</div>
				<h2>anecdote with most votes:</h2>
				<div>{this.props.anecdotes[maxAnecdote]}</div>
				<div>has {votes[maxAnecdote] || 0} votes</div>
			</div>
		)
	}
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
	<App anecdotes={anecdotes} />,
	document.getElementById('root')
);